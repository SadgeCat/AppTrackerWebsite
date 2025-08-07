import { useState, useEffect } from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import AIPlanner from "./pages/AIPlanner";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";

const App = () => {
    const [cardList, setCardList] = useState(() => {
        const saved = localStorage.getItem("cardList");
        return saved
            ? JSON.parse(saved).map(card => ({
                ...card,
                deadline: new Date(card.deadline),
            }))
            : [];
    });

    useEffect(() => {
        localStorage.setItem("cardList", JSON.stringify(cardList));
    }, [cardList]);

    const addCard = (id, title, desc, deadline, status, type) => {
        const newCard = {
            id: Date.now(),
            title: title,
            desc: desc,
            deadline: deadline,
            status: status,
            type: type
        };
        setCardList(prev => [...prev, newCard]);
    };

    const editCard = (id, title, desc, deadline, status, type) => {
        setCardList(prev =>
            prev.map(card =>
                card.id === id
                    ? { ...card, title, desc, deadline, status, type }
                    : card
            )
        );
    };

    const deleteCard = (id) => {
        console.log("Deleting from App.jsx:", id);
        setCardList(prev => prev.filter(card => card.id !== id));
    };

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Dashboard cardList={cardList} onAddCard={addCard} onEditCard={editCard} onDeleteCard={deleteCard}/>}/>
                        <Route path="/Calendar" element={<Calendar cardList={cardList}/>}/>
                        <Route path="/AIPlanner" element={<AIPlanner cardList={cardList}/>}/>
                        <Route path="/Resources" element={<Resources/>}/>
                        <Route path="/Settings" element={<Settings/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
