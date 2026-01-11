import React, { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import SettingsModal from '../settings/SettingsModal';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import './Chat.css';

interface ImageState {
  file: File | null;
  url: string;
}

const Chat: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<ImageState>({ file: null, url: '' });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  const { chatId, user, messages, sendMessage, startMessageListener } = useChatStore();
  const { currentUser, isAdmin } = useUserStore();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = startMessageListener();
      return () => unsubscribe?.();
    }
  }, [chatId, startMessageListener]);

  // Initialize chat document if it doesn't exist
  useEffect(() => {
    const initializeChat = async (): Promise<void> => {
      if (!chatId || !currentUser) return;

      const docId = isAdmin ? chatId : currentUser.uid || currentUser.id;
      
      if (!docId) return;
      
      try {
        const chatDoc = await getDoc(doc(db, "chats", docId));
        if (!chatDoc.exists()) {
          await setDoc(doc(db, "chats", docId), {
            messages: [],
            lastMessage: "",
            lastMessageTime: Timestamp.now(),
            updatedAt: Timestamp.now(),
            userInfo: !isAdmin ? {
              uid: currentUser.uid || currentUser.id,
              displayName: currentUser.displayName || 'Anonymous User',
              email: currentUser.email,
              avatar: currentUser.avatar || './avatar.png'
            } : null
          });
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
      }
    };

    initializeChat();
  }, [chatId, currentUser, isAdmin]);

  const handleEmoji = (e: EmojiClickData): void => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async (): Promise<void> => {
    if (text === '' && !img.file) return;

    let imgUrl: string | null = null;

    try {
      if (img.file) {
        setIsUploading(true);
        const storageRef = ref(storage, `images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, img.file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            reject,
            async () => {
              imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
        setIsUploading(false);
      }

      await sendMessage(text, imgUrl);
      
      setImg({ file: null, url: '' });
      setText('');
    } catch (err) {
      console.error('Error sending message:', err);
      setIsUploading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatId) {
    return (
      <div className="chat">
        <div className="chat-placeholder">
          {isAdmin ? 'Select a user to start chatting' : 'Loading chat...'}
        </div>
      </div>
    );
  }

  // AI Auto Reply Function
  const sendAutoReply = async (): Promise<void> => {
    const autoReplies = [
      "สวัสดีครับ ยินดีให้บริการ มีอะไรให้ช่วยเหลือไหมครับ?",
      "ขออภัยที่ตอบช้า ตอนนี้ทีมงานกำลังช่วยเหลือคุณอยู่",
      "ขอบคุณที่ติดต่อมา เราจะช่วยแก้ไขปัญหาให้เร็วที่สุด",
      "หากมีคำถามเพิ่มเติม สามารถสอบถามได้เสมอนะครับ"
    ];
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    
    setTimeout(async () => {
      // ส่งข้อความโดยใช้ sendMessage ปกติ ซึ่งจะใช้ senderId = 'admin' อัตโนมัติ
      await sendMessage(randomReply);
    }, 2000);
  };

  return (
    <div className="chat">
      <div className="chat-top">
        {isAdmin && (
          <button className="back-btn" onClick={() => {
            const { resetChat } = useChatStore.getState();
            resetChat();
          }}>
            ← Back
          </button>
        )}
        <div className="chat-user">
          <div className="user-icon">👤</div>
          <div className="chat-texts">
            <span>{isAdmin ? (user?.displayName || 'Customer') : 'Support Team'}</span>
            <p>🟢 Online</p>
          </div>
        </div>
        <div className="chat-actions">
          <button 
            className="settings-btn" 
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            ⚙️
          </button>
          {isAdmin && (
            <button className="ai-reply-btn" onClick={sendAutoReply} title="Send AI Reply">
              🤖
            </button>
          )}
        </div>
      </div>

      <div className="chat-center">
        {messages?.map((message: any, index: number) => {
          const isOwn = isAdmin 
            ? message.senderId === 'admin' 
            : message.senderId === (currentUser?.uid || currentUser?.id);
          return (
            <div
              className={isOwn ? 'message own' : 'message'}
              key={index}
            >
              <div className="message-info">
                <span className="sender-name">
                  {message.senderId === 'admin' ? 'Admin' : (isAdmin ? user?.displayName : 'Support')}
                </span>
              </div>
              <div className="message-texts">
                {message.text && <p>{message.text}</p>}
                <span>{new Date(message.createdAt?.seconds * 1000).toLocaleTimeString()}</span>
              </div>
            </div>
          );
        })}
        {isUploading && <div className="message">Uploading image...</div>}
        <div ref={endRef}></div>
      </div>

      <div className="chat-bottom">
        <div className="chat-icons">
          <label htmlFor="file" className="file-btn" title="Send Image">
            📷
          </label>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={handleImg}
            accept="image/*"
          />
        </div>
        <input
          type="text"
          placeholder={isAdmin ? 'Type a message to customer...' : 'Type your message...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isUploading}
        />
        <div className="emoji">
          <button
            className="emoji-btn"
            onClick={() => setOpen((prev) => !prev)}
            title="Add Emoji"
          >
            😊
          </button>
          <div className="picker">
            <EmojiPicker 
              open={open} 
              onEmojiClick={handleEmoji}
              width={250}
              height={300}
            />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isUploading || (text === '' && !img.file)}
          title="Send Message"
        >
          {isUploading ? '⏳' : '📤'}
        </button>
      </div>

      {img.url && (
        <div className="image-preview">
          <img src={img.url} alt="Preview" />
          <button onClick={() => setImg({ file: null, url: '' })}>×</button>
        </div>
      )}

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default Chat;