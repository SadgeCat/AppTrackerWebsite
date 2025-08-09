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
        setFilteredCardList(cardList);
    }, [cardList]);

    const [filteredCardList, setFilteredCardList] = useState(cardList);
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {
        const filtered = cardList.filter((card) => {
            const deadline = new Date(card.deadline);
            const diffMs = deadline - new Date();
            const diffDays = diffMs / (1000 * 60 * 60 * 24);

            let matchesDateFilter = true;
            if(filterDate === "1day"){
                matchesDateFilter = diffDays <= 1;
            } else if(filterDate === "1week"){
                matchesDateFilter = diffDays <= 7;
            } else if(filterDate === "1month"){
                matchesDateFilter = diffDays <= 30;
            } else if(filterDate === "1year"){
                matchesDateFilter = diffDays <= 365;
            }

            return (
                (filterType === "" || card.type === filterType) &&
                (filterStatus === "" || card.status === filterStatus) &&
                card.title.toLowerCase().includes(search.toLowerCase()) &&
                matchesDateFilter
            );
        });
        setFilteredCardList(filtered);
    }, [search, filterType, filterStatus, filterDate, cardList]);

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
                        <Route path="/" element={<Dashboard 
                                                    cardList={filteredCardList}
                                                    filterType={filterType}
                                                    setFilterType={setFilterType}
                                                    filterStatus={filterStatus}
                                                    setFilterStatus={setFilterStatus}
                                                    filterDate={filterDate}
                                                    setFilterDate={setFilterDate}
                                                    search={search}
                                                    setSearch={setSearch}
                                                    onAddCard={addCard}
                                                    onEditCard={editCard}
                                                    onDeleteCard={deleteCard}/>}/>
                        <Route path="/Calendar" element={<Calendar cardList={filteredCardList}/>}/>
                        <Route path="/AIPlanner" element={<AIPlanner cardList={filteredCardList}/>}/>
                        <Route path="/Resources" element={<Resources/>}/>
                        <Route path="/Settings" element={<Settings/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
