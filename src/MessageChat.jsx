import React, { useState } from 'react';
import './Styles/MessageChat.css';

export const MessageChat = ({ user, role, time, message, isUserMessage, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [showActions, setShowActions] = useState(false);

  const handleEditSubmit = () => {
    onEdit(editedMessage);
    setIsEditing(false);
  };

  return (
    <div 
      className={`chat-message ${isUserMessage ? 'user-message' : 'other-message'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="chat-info">
        <span className="chat-user">{user}</span>
        {!isUserMessage && <span className="chat-role">{role}</span>}
      </div>
      
      {isEditing ? (
        <div className="message-edit-container">
          <input
            type="text"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            className="message-edit-input"
            autoFocus
          />
          <div className="message-edit-buttons">
            <button onClick={handleEditSubmit} className="message-action-btn save-btn">✓</button>
            <button onClick={() => setIsEditing(false)} className="message-action-btn cancel-btn">✕</button>
          </div>
        </div>
      ) : (
        <div className="chat-text">{message}</div>
      )}
      
      <div className="chat-time">{time}</div>
      
      {isUserMessage && showActions && !isEditing && (
        <div className="message-actions">
          <button onClick={() => setIsEditing(true)} className="message-action-btn edit-btn">✎</button>
          <button onClick={onDelete} className="message-action-btn delete-btn">🗑</button>
        </div>
      )}
    </div>
  );
};
