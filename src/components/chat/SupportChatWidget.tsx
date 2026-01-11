import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { useChatStore } from '../../lib/chatStore';
import Login from './Login';
import Chat from './Chat';
import ChatList from './ChatList';
import './SupportChatWidget.css';

const SupportChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentUser, isLoading, isAdmin, fetchUserInfo, resetUser } = useUserStore();
  const { connectToSupport, resetChat } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        resetUser();
        resetChat();
      }
    });

    return () => unSub();
  }, [fetchUserInfo, resetUser, resetChat]);

  useEffect(() => {
    // Auto-connect regular users to support
    if (currentUser && !isAdmin) {
      connectToSupport(currentUser);
    }
  }, [currentUser, isAdmin, connectToSupport]);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      resetUser();
      resetChat();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="support-chat-widget">
        <button 
          className="chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          💬
        </button>
        {isOpen && (
          <div className="chat-container">
            <div className="loading">Loading...</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="support-chat-widget">
      <button 
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {isOpen && (
        <div className="chat-container">
          {currentUser ? (
            <>
              <div className="chat-header">
                <div className="user-info">
                  <div className="user-icon">👤</div>
                  <span>{currentUser.displayName}</span>
                  {isAdmin && <span className="admin-badge">Admin</span>}
                </div>
                <div className="chat-actions">
                  <button onClick={() => setIsOpen(false)}>−</button>
                  <button onClick={handleLogout}>↪</button>
                </div>
              </div>

              <div className="chat-content">
                {isAdmin ? (
                  <div className="admin-layout">
                    <div className="admin-sidebar">
                      <ChatList />
                    </div>
                    <div className="admin-chat">
                      <Chat />
                    </div>
                  </div>
                ) : (
                  <div className="user-layout">
                    <Chat />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="chat-header">
                <h3>Customer Support</h3>
                <button onClick={() => setIsOpen(false)}>×</button>
              </div>
              <Login />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportChatWidget;