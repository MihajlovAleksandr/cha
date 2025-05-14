import "./Styles/TextInputArea.css"

export function TextInputArea({ inputText, setInputText, handleSendMessage }) {
    return (
        <div className="TextInputArea">
            <input 
                id="msgTextInput" 
                placeholder="Start typing..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            ></input>
            <button id="sendMsgBtn" onClick={handleSendMessage}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M2 21l21-9-21-9v7l15 2-15 2z"/>
                </svg>
            </button>
        </div>
    );
}

export default TextInputArea;