import React, { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserInfo, updateUserPassword, uploadUserAvatar } = useUserStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  
  // Profile form states
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Password form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen || !currentUser) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates: { displayName?: string; avatar?: string } = {};
      
      if (displayName !== currentUser.displayName) {
        updates.displayName = displayName;
      }
      
      if (avatarFile) {
        const avatarUrl = await uploadUserAvatar(avatarFile);
        updates.avatar = avatarUrl;
      }
      
      if (Object.keys(updates).length > 0) {
        await updateUserInfo(updates);
        alert('โปรไฟล์อัปเดตสำเร็จแล้ว!');
      }
      
      // Reset form
      setAvatarFile(null);
      setAvatarPreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      alert(error.message || 'ไม่สามารถอัปเดตโปรไฟล์ได้');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);
    try {
      await updateUserPassword(currentPassword, newPassword);
      alert('เปลี่ยนรหัสผ่านสำเร็จแล้ว!');
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      alert(error.message || 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      try {
        await signOut(auth);
        onClose();
      } catch (error) {
        alert('ไม่สามารถออกจากระบบได้');
      }
    }
  };

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <form className="settings-form" onSubmit={handleProfileUpdate}>
              <h3>Profile Information</h3>
              
              <div className="avatar-section">
                <div className="avatar-display">
                  <img 
                    src={avatarPreview || currentUser.avatar || './avatar.png'} 
                    alt="Avatar" 
                    className="current-avatar"
                  />
                </div>
                <div className="avatar-controls">
                  <button 
                    type="button" 
                    className="change-avatar-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Avatar
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={currentUser.email}
                  disabled
                  className="disabled-input"
                />
              </div>

              <button type="submit" className="update-button" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <form className="settings-form" onSubmit={handlePasswordUpdate}>
              <h3>Change Password</h3>
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" className="update-button" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          )}
        </div>

        <div className="settings-footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;