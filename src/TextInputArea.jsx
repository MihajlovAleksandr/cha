import "./Styles/TextInputArea.css"
export function TextInputArea(){
    return (
        <div className="TextInputArea">
            <input placeholder="Start typing..."></input>
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M2 21l21-9-21-9v7l15 2-15 2z"/>
                </svg>
            </button>
        </div>
    );
}
export default TextInputArea;
