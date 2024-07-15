// pages/notes.tsx

import React, { useState } from 'react';
import Link from 'next/link';

interface Note {
  _id: string;
  description: string;
  completed: boolean;
}

interface NotesProps {
  theme: 'light' | 'dark';
  notes: Note[];
  error: string | null;
  handleAddNote: () => void;
  newNoteTitle: string;
  setNewNoteTitle: (title: string) => void;
}

const NotesPage: React.FC<NotesProps> = ({
  theme,
  notes,
  error,
  handleAddNote,
  newNoteTitle,
  setNewNoteTitle,
}) => {
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
          {notes.map((note) => (
            <div className="note-item" key={note._id}>
              <h3>{note.description}</h3>
              <p>{note.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
          ))}
        </div>
        <p><Link href="/add-note">Add Note</Link></p>
      </div>
    </div>
  );
};

export default NotesPage;
