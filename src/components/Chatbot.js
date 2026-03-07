import React from 'react';

export default function Chatbot({
    chatOpen, setChatOpen, messages, botTyping, userInput, setUserInput, sendMessage
}) {
    return (
        <>
            {/* CHATBOT FAB */}
            <button className="chat-fab" onClick={() => setChatOpen(o => !o)}>
                {chatOpen ? '✕' : '💬'}
            </button>

            {/* CHAT WINDOW */}
            {chatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span className="chat-avatar">🦷</span>
                        <div>
                            <div className="chat-name">PearlAssistant</div>
                            <div className="chat-status">● Online</div>
                        </div>
                        <button className="chat-close" onClick={() => setChatOpen(false)}>✕</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={'chat-msg ' + m.from}>
                                <div className="chat-bubble">
                                    {m.text.split('\n').map((line, j) => (
                                        <span key={j}>{line}<br /></span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {botTyping && (
                            <div className="chat-msg bot">
                                <div className="chat-bubble typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="chat-input-row">
                        <input className="chat-input" placeholder="Type a message…"
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                        />
                        <button className="chat-send" onClick={sendMessage}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
}
