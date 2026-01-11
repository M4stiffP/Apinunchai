import { create } from 'zustand';
import { doc, onSnapshot, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useUserStore } from './userStore';

interface Message {
  senderId: string;
  text: string;
  createdAt: Date | any;
  img?: string;
}

interface ChatUser {
  id: string;
  uid?: string;
  displayName: string;
  avatar?: string;
  email?: string;
}

interface ChatStore {
  chatId: string | null;
  user: ChatUser | null;
  messages: Message[];
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chatId: string, user: ChatUser) => void;
  connectToSupport: (currentUser: any) => Promise<string>;
  sendMessage: (text: string, imageUrl?: string | null) => Promise<void>;
  startMessageListener: () => (() => void) | undefined;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatId: null,
  user: null,
  messages: [],
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  // For admin: change chat when clicking on a user from ChatList
  changeChat: (chatId: string, user: ChatUser) => {
    const currentUser = useUserStore.getState().currentUser;
    
    if (currentUser?.id === user?.id) {
      return set({
        chatId: null,
        user: null,
        messages: [],
      });
    }

    set({
      chatId,
      user,
      messages: [],
    });
  },

  // For regular users: auto-connect to admin chat
  connectToSupport: async (currentUser: any): Promise<string> => {
    if (!currentUser) return '';
    
    const chatId = currentUser.uid || currentUser.id;

    set({
      chatId,
      user: { id: 'admin', displayName: 'Support Team' },
      messages: [],
    });

    return chatId;
  },

  // Send message function
  sendMessage: async (text: string, imageUrl: string | null = null): Promise<void> => {
    const { chatId } = get();
    const currentUser = useUserStore.getState().currentUser;
    
    if (!chatId || !currentUser) return;

    const isAdmin = useUserStore.getState().isAdmin;
    
    try {
      const message: Message = {
        senderId: isAdmin ? 'admin' : (currentUser.uid || currentUser.id || ''),
        text,
        createdAt: new Date(),
        ...(imageUrl && { img: imageUrl })
      };

      // For regular users, chatId is their UID
      // For admin, chatId is the selected user's UID
      const docId = isAdmin ? chatId : currentUser.uid || currentUser.id;
      
      if (!docId) return;

      console.log("Sending message:", { isAdmin, chatId, docId, message });

      await updateDoc(doc(db, "chats", docId), {
        messages: arrayUnion(message),
        lastMessage: text || "Image",
        lastMessageTime: Timestamp.now(),
        updatedAt: Timestamp.now(),
        // Store user info for admin to see in ChatList
        userInfo: !isAdmin ? {
          uid: currentUser.uid || currentUser.id,
          displayName: currentUser.displayName || 'Anonymous User',
          email: currentUser.email,
          avatar: currentUser.avatar || './avatar.png'
        } : get().user ? {
          uid: get().user?.uid || get().user?.id,
          displayName: get().user?.displayName || 'Anonymous User',
          email: get().user?.email,
          avatar: get().user?.avatar || './avatar.png'
        } : undefined
      });

      console.log("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  },

  // Real-time message listener
  startMessageListener: () => {
    const { chatId } = get();
    const currentUser = useUserStore.getState().currentUser;
    const isAdmin = useUserStore.getState().isAdmin;
    
    if (!chatId || !currentUser) return;

    // For regular users, listen to their own UID document
    // For admin, listen to the selected user's UID document
    const docId = isAdmin ? chatId : currentUser.uid || currentUser.id;
    
    if (!docId) return;

    console.log("Starting message listener:", { isAdmin, chatId, docId });

    const unsub = onSnapshot(doc(db, "chats", docId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Messages received:", data.messages);
        set({ messages: data.messages || [] });
      } else {
        console.log("Document does not exist:", docId);
      }
    });

    return unsub;
  },

  // Reset chat state
  resetChat: () => {
    set({
      chatId: null,
      user: null,
      messages: [],
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  }
}));