import './Styles/App.css';
import { Header } from './Header';
import MessageChat from './MessageChat';
import TextInputArea from './TextInputArea';
import { useState, useEffect } from 'react';

const currentUserId = localStorage.getItem("userId"); // Получаем userId
console.log(currentUserId);

function App() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Загружаем сообщения из API при монтировании
    useEffect(() => {
        fetch('http://localhost:3001/api/getMessages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            text: inputText,
            time: new Date().toString(),
            userId: currentUserId
        };

        console.log(newMessage.time);

        // Отправка сообщения на сервер
        try {
            const response = await fetch('http://localhost:3001/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) throw new Error('Ошибка отправки сообщения');

            setMessages([...messages, newMessage]);
            setInputText('');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="app-wrapper">
            <Header />
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper ${msg.userId == currentUserId ? 'user' : 'other'}`}>
                        <MessageChat 
                            user={msg.username} 
                            time={new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                            message={msg.text} 
                            isUserMessage={msg.userId == currentUserId} 
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
