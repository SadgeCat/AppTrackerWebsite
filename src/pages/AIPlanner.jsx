import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"

const AIPlanner = ({ cardList }) => {
    const [suggestions, setSuggestions] = useState({});
    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState("");

    const fetchSuggestions = async (card) => {
        const res = await fetch("http://localhost:3001/api/groq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ card }),
        });

        const data = await res.json();
        return data.suggestion;
    };

    useEffect(() => {
        const getAllSuggestions = async () => {
            const newSuggestions = {};
            for (const card of cardList) {
                const suggestion = await fetchSuggestions(card);
                newSuggestions[card.id] = suggestion;
            }
            setSuggestions(newSuggestions);
        };

        getAllSuggestions();
    }, [cardList]);

    useEffect(() => {
        const getInitialPlan = async () => {
            const res = await fetch("http://localhost:3001/api/groq-initial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardList }),
            });
            const data = await res.json();
            const assistantMsg = { role: "assistant", content: data.suggestion };
            setConversation([assistantMsg]);
        };

        if(cardList.length > 0) getInitialPlan();
    }, [cardList]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newConv = [...conversation, { role: "user", content: input }];
        setConversation(newConv);
        setInput("");

        const res = await fetch("http://localhost:3001/api/groq-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: newConv }),
        });
        const data = await res.json();

        setConversation([...newConv, { role: "assistant", content: data.suggestion }]);
    };

    return (
        <div className="ai-planner">
            <h2 className="title">AI Planner</h2>

            <div className="chat-box">
                {conversation.map((msg, idx) => (
                    <div key={idx} className={`msg ${msg.role}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Ask anything"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                <button onClick={sendMessage}>Send</button>
            </div>

            {cardList.map((card) => (
                <div key={card.title} className="ai-suggestion-card">
                    <h4>{card.title}</h4>
                    <div className="suggestion-box">
                        <ReactMarkdown>{suggestions[card.id] || "Generating..."}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AIPlanner;