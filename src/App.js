import './Styles/App.css';
import { Header } from './Header';
import { MessageChat } from './MessageChat';
import TextInputArea from './TextInputArea';
import { useState, useEffect } from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            window.location.href = "/login"; 
        } else {
            fetchMessages();
        }
    }, []);

    const fetchMessages = () => {
        fetch('http://localhost:3001/api/getMessages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Ошибка:', error));
    };

    const handleSendMessage = async () => {
        const userId = localStorage.getItem("userId");
        if (inputText.trim() === '' || !userId) return;

        const newMessage = {
            text: inputText,
            time: new Date().toString(),
            userId
        };

        try {
            const response = await fetch('http://localhost:3001/api/createMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) throw new Error('Ошибка отправки сообщения');

            fetchMessages(); 
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

            fetchMessages();
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

            fetchMessages();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="app-wrapper">
            <Header />
            <div className="chat-container">
                {messages.map((msg) => (
                    <div key={msg.Id} className={`message-wrapper ${msg.userId === localStorage.getItem("userId") ? 'user' : 'other'}`}>
                        <MessageChat 
                            user={msg.username} 
                            role={msg.role}
                            time={new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                            message={msg.text} 
                            isUserMessage={msg.userId == localStorage.getItem("userId")} 
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
