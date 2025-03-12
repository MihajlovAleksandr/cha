import React from 'react';
import './Styles/MessageChat.css';

const MessageChat = ({ user, time, message, role, isUserMessage }) => {
  return (
    <div className={`chat-message ${isUserMessage ? 'user-message' : 'other-message'}`}>
      <div className="chat-body">
        { !isUserMessage && (
          <div className="chat-info">
            <span className="chat-user">{user}</span>
            {role && <span className="chat-role">{role}</span>}
          </div>
        ) }
        <div className="chat-text">{message}</div>
        <div className="chat-time">{time}</div>
      </div>
    </div>
  );
};

export default MessageChat;
