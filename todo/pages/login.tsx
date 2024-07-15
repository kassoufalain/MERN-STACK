// Login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import '../styles/signup.css'; // Import your signup.css file here

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // State for theme

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);

      // Store token in localStorage
      localStorage.setItem('userId', response.data.token);

      // Assuming response is in correct format
      console.log('Login successful:', response.data);

      // Redirect to notes page after successful login
      router.push('/notes');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  const NotesPage = () => {
    const [theme, setTheme] = useState('light'); // Assuming 'light' is the default theme
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  
    return (
      <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
        <div className="header">
          <div className="logo">
            <h1>TO DO APP</h1>
            <p>Stop Procrastinating, Start Organizing</p>
          </div>
          <div className="icons">
            <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
              <img src="/path/to/your/theme-icon.png" alt="theme selector" />
            </button>
            <img className="icon user-profile" src="/path/to/your/profile-photo.png" alt="profile photo" />
          </div>
        </div>
        <div className="container">
          <h2>Notes</h2>
          <div className="notes-list">
            {/* Replace with your actual notes data rendering logic */}
            <div className="note-item">
              <h3>Note 1</h3>
              <p>This is the content of note 1.</p>
            </div>
            <div className="note-item">
              <h3>Note 2</h3>
              <p>This is the content of note 2.</p>
            </div>
            {/* Example note item */}
          </div>
          <p><Link href="/add-note">Add Note</Link></p>
        </div>
      </div>
    );
};

export default Login;
