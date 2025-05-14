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

const formatDate = (dateString) => {
    const options = { month: 'numeric', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

    const shouldDisplayDate = (currentMessage, previousMessage) => {
        if (!previousMessage) return true;
        const currentDate = new Date(currentMessage.time).toDateString();
        const previousDate = new Date(previousMessage.time).toDateString();
        return currentDate !== previousDate;
    };

    const handleSendMessage = async () => {
        const userId = localStorage.getItem("userId");
        if (inputText.trim() === '' || !userId) return;

        const newMessage = {
            text: inputText,
            time: new Date().toISOString(),
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
                {messages.map((msg, index) => (
                    <div key={msg.Id}>
                        {shouldDisplayDate(msg, messages[index - 1]) && (
                            <div className="date-separator">
                                {formatDate(msg.time)}
                            </div>
                        )}
                        <div className={`message-wrapper ${msg.userId === localStorage.getItem("userId") ? 'user' : 'other'}`}>
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
