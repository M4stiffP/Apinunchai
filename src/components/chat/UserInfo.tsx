import React, { useState } from 'react';
import { useUserStore } from '../../lib/userStore';
import SettingsModal from '../settings/SettingsModal';
import './UserInfo.css';

const UserInfo: React.FC = () => {
  const { currentUser, isAdmin } = useUserStore();
  const [showSettings, setShowSettings] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="user-info">
      <div className="user-details">
        <img 
          src={currentUser.avatar || './avatar.png'} 
          alt="User Avatar" 
          className="user-avatar"
        />
        <div className="user-text">
          <span className="user-name">
            {currentUser.displayName}
            {isAdmin && <span className="admin-badge">ADMIN</span>}
          </span>
          <p className="user-email">{currentUser.email}</p>
        </div>
      </div>
      <button 
        className="settings-btn" 
        onClick={() => setShowSettings(true)}
        title="User Settings"
      >
        ⚙️
      </button>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default UserInfo;