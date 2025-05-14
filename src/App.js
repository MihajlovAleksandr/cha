import './Styles/App.css';
import { Header } from './Header';
import { MessageChat } from './MessageChat';
import TextInputArea from './TextInputArea';
import { useState, useEffect } from 'react';

const currentUserId = localStorage.getItem("userId");

function App() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Загружаем сообщения из API при монтировании
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        fetch('http://localhost:3001/api/getMessages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Ошибка:', error));
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            text: inputText,
            time: new Date().toString(),
            userId: currentUserId
        };

        try {
            const response = await fetch('http://localhost:3001/api/createMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) throw new Error('Ошибка отправки сообщения');

            fetchMessages(); // Refresh messages after sending
            setInputText('');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleEditMessage = async (messageId, newText) => {
        try {
            const response = await fetch(`http://localhost:3001/api/updateMessage/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            });

            if (!response.ok) throw new Error('Ошибка обновления сообщения');

            fetchMessages(); // Refresh messages after editing
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/deleteMessage/${messageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Ошибка удаления сообщения');

            fetchMessages(); // Refresh messages after deletion
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="app-wrapper">
            <Header />
            <div className="chat-container">
                {messages.map((msg) => (
                    <div key={msg.Id} className={`message-wrapper ${msg.userId == currentUserId ? 'user' : 'other'}`}>
                        <MessageChat 
                            user={msg.username} 
                            role = {msg.role}
                            time={new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                            message={msg.text} 
                            isUserMessage={msg.userId == currentUserId} 
                            onEdit={(newText) => handleEditMessage(msg.Id, newText)}
                            onDelete={() => handleDeleteMessage(msg.Id)}
                        />
                    </div>
                ))}
            </div>
            <TextInputArea 
                inputText={inputText} 
                setInputText={setInputText} 
                handleSendMessage={handleSendMessage} 
            />
        </div>
    );
}

export default App;