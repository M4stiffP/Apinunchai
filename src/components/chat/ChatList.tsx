import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import './ChatList.css';

interface ChatUser {
  uid: string;
  displayName: string;
  avatar: string;
  email: string;
}

interface ChatItem {
  id: string;
  lastMessage: string;
  lastMessageTime: any;
  unreadCount?: number;
  user: ChatUser;
}

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { changeChat, chatId } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chats"),
      orderBy("updatedAt", "desc")
    );

    const unSub = onSnapshot(q, (snapshot) => {
      const items: ChatItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include chats that have userInfo (from regular users)
        if (data.userInfo && data.userInfo.uid) {
          items.push({
            id: doc.id, // This is the user's UID
            lastMessage: data.lastMessage || '',
            lastMessageTime: data.lastMessageTime,
            unreadCount: data.unreadCount || 0,
            user: data.userInfo
          });
        }
      });
      setChats(items);
      setLoading(false);
    });

    return () => unSub();
  }, [currentUser]);

  const handleSelect = (chat: ChatItem): void => {
    const userInfo = {
      id: chat.id,
      uid: chat.user.uid,
      displayName: chat.user.displayName,
      avatar: chat.user.avatar,
      email: chat.user.email
    };
    
    changeChat(chat.id, userInfo);
  };

  if (loading) {
    return <div className="chatList loading">Loading chats...</div>;
  }

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search customers..." />
        </div>
      </div>

      <div className="chat-items">
        {chats.length === 0 ? (
          <div className="no-chats">
            <p>No customer chats yet</p>
            <span>Customers will appear here when they start a conversation</span>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              className={`chat-item ${chatId === chat.id ? 'selected' : ''}`}
              key={chat.id}
              onClick={() => handleSelect(chat)}
            >
              <div className="user-icon">👤</div>
              <div className="chat-texts">
                <span className="chat-name">
                  {chat.user.displayName || 'Anonymous User'}
                </span>
                <p className="chat-last-message">
                  {chat.lastMessage || 'No messages yet'}
                </p>
              </div>
              <div className="chat-meta">
                {chat.lastMessageTime && (
                  <span className="chat-time">
                    {new Date(chat.lastMessageTime.seconds * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                )}
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <div className="unread-badge">{chat.unreadCount}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;