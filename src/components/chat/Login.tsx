import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import './Login.css';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);

  const { sendPasswordReset } = useUserStore();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password, displayName } = Object.fromEntries(formData) as {
      email: string;
      password: string;
      displayName?: string;
    };

    try {
      if (isRegister) {
        // Register new user
        console.log("Attempting to register with:", email);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registration successful:", res.user.uid);
        
        // Save user data to Firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email,
          displayName: displayName || 'Anonymous User',
          avatar: './avatar.png',
          blocked: [],
          role: email === 'admin@gmail.com' ? 'admin' : 'user'
        });
        console.log("User data saved to Firestore");
      } else {
        // Login existing user
        console.log("Attempting to login with:", email);
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      
      // Show more specific error messages
      let errorMessage = err.message;
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบใหม่';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'อีเมลนี้ถูกใช้แล้ว กรุณาใช้อีเมลอื่น';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'ไม่พบผู้ใช้นี้ กรุณาสมัครสมาชิกก่อน';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      alert("กรุณาใส่อีเมลของคุณ");
      return;
    }

    setForgotLoading(true);
    try {
      await sendPasswordReset(forgotEmail);
      alert("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว กรุณาตรวจสอบอีเมลของคุณ");
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error: any) {
      alert(error.message || "ไม่สามารถส่งอีเมลรีเซ็ตได้");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <form onSubmit={handleLogin}>
          {isRegister && (
            <input
              type="text"
              placeholder="Display Name"
              name="displayName"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : (isRegister ? "Sign Up" : "Sign In")}
          </button>
        </form>
        
        {!isRegister && (
          <div className="forgot-password">
            <button 
              type="button" 
              className="forgot-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>
        )}
        
        <p>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="switch-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="forgot-modal-header">
              <h3>Reset Password</h3>
              <button 
                className="close-button"
                onClick={() => setShowForgotPassword(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleForgotPassword}>
              <p>Enter your email address and we'll send you a link to reset your password.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <div className="forgot-modal-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                >
                  {forgotLoading ? "Sending..." : "Send Reset Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;