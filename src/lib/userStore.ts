import { create } from 'zustand';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { 
  updateProfile, 
  updatePassword, 
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './firebase';

interface User {
  uid: string;
  id?: string;
  email: string;
  displayName: string;
  avatar: string;
  role?: string;
}

interface UserStore {
  currentUser: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  fetchUserInfo: (uid: string) => Promise<void>;
  updateUserInfo: (updates: { displayName?: string; avatar?: string }) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  uploadUserAvatar: (file: File) => Promise<string>;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  isLoading: true,
  isAdmin: false,

  fetchUserInfo: async (uid: string) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false, isAdmin: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        const isAdminUser = userData.email === 'admin@gmail.com' || userData.role === 'admin';
        
        set({ 
          currentUser: userData, 
          isLoading: false,
          isAdmin: isAdminUser
        });
      } else {
        // If user doc doesn't exist, create basic user info from auth
        const user = auth.currentUser;
        if (user) {
          const userData: User = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Anonymous User',
            avatar: user.photoURL || './avatar.png'
          };
          const isAdminUser = user.email === 'admin@gmail.com';
          
          set({ 
            currentUser: userData, 
            isLoading: false,
            isAdmin: isAdminUser
          });
        }
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false, isAdmin: false });
    }
  },

  updateUserInfo: async (updates: { displayName?: string; avatar?: string }) => {
    const { currentUser } = get();
    if (!currentUser || !auth.currentUser) return;

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName || currentUser.displayName,
        photoURL: updates.avatar || currentUser.avatar
      });

      // Update Firestore document
      await updateDoc(doc(db, "users", currentUser.uid), {
        ...updates,
        displayName: updates.displayName || currentUser.displayName,
        avatar: updates.avatar || currentUser.avatar
      });

      // Update local state
      set({
        currentUser: {
          ...currentUser,
          displayName: updates.displayName || currentUser.displayName,
          avatar: updates.avatar || currentUser.avatar
        }
      });

      console.log("User info updated successfully");
    } catch (err) {
      console.error("Error updating user info:", err);
      throw err;
    }
  },

  updateUserPassword: async (currentPassword: string, newPassword: string) => {
    if (!auth.currentUser) throw new Error("No authenticated user");

    try {
      // Reauthenticate user first
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);
      console.log("Password updated successfully");
    } catch (err: any) {
      console.error("Error updating password:", err);
      if (err.code === 'auth/wrong-password') {
        throw new Error("Current password is incorrect");
      }
      throw err;
    }
  },

  sendPasswordReset: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (err: any) {
      console.error("Error sending password reset email:", err);
      if (err.code === 'auth/user-not-found') {
        throw new Error("No account found with this email address");
      }
      throw err;
    }
  },

  uploadUserAvatar: async (file: File): Promise<string> => {
    if (!auth.currentUser) throw new Error("No authenticated user");

    try {
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          reject,
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (err) {
      console.error("Error uploading avatar:", err);
      throw err;
    }
  },

  resetUser: () => {
    set({ currentUser: null, isLoading: false, isAdmin: false });
  }
}));