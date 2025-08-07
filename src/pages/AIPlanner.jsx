import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"

const AIPlanner = ({ cardList }) => {
    const [suggestions, setSuggestions] = useState({});

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

    return (
        <div className="ai-planner">
            <h2 className="title">AI Planner</h2>
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