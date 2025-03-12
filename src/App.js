
import './Styles/App.css';
import { Header } from './Header';
import MessageChat from './MessageChat';

const currentUserId = "Alice";

function App() {
  const messages = [
    { id: '1', user: 'Unknown', time: '11:31 AM', message: 'Hi team 👋' },
    { id: '2', user: 'Unknown', time: '11:31 AM', message: 'Anyone on for lunch today' },
    { id: '3', user: 'Jav', time: '11:35 AM', message: "I'm down! Any ideas??", role: 'Engineering' },
    { id: '4', user: 'Unknown', time: '11:36 AM', message: 'I am down for whatever!' },
    { id: '5', user: 'Aubrey', time: '11:45 AM', message: 'I was thinking the cafe downtown', role: 'Product' },
    { id: '6', user: 'Aubrey', time: '11:46 AM', message: 'But limited vegan options @Janet!', role: 'Product' },
    { id: '7', user: 'Unknown', time: '11:52 PM', message: 'Agreed' },
    { id: '8', user: 'Alice', time: '12:00 PM', message: 'Let’s meet at the common area.' },
  ];

  return (
    <div className="app-wrapper">
      <Header />
      <div className="chat-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-wrapper ${msg.user === currentUserId ? 'user' : 'other'}`}
          >
            <MessageChat
              user={msg.user}
              time={msg.time}
              message={msg.message}
              role={msg.role}
              isUserMessage={msg.user === currentUserId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
