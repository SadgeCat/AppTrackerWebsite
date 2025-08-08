import { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";

const MainContent = (props) => {
    const [isOnAddCard, setIsOnAddCard] = useState(false);
    const [isOnEditCard, setIsOnEditCard] = useState(false);
    const [cardID, setCardID] = useState(null);

    const toggleIsOnAddCard = () => {
        setIsOnAddCard(!isOnAddCard);
        setIsOnEditCard(false);
    }
    const toggleIsOnEditCard = (newID) => {
        setIsOnEditCard(!isOnEditCard);
        setIsOnAddCard(false);
        setCardID(newID);
    }

    return (
        <>
        <main>
            <h1 className="title">Application Dashboard</h1>
            <div className="container">
                <div className="filter-sidebar">
                    <div className="filter-section">
                        <h4>Type</h4>
                        <select value={props.filterType} onChange={(e) => props.setFilterType(e.target.value)}>
                        <option value="">All</option>
                        <option value="School">School</option>
                        <option value="Work">Work</option>
                        <option value="Family">Family</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Trip">Trip</option>
                        <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h4>Status</h4>
                        <select value={props.filterStatus} onChange={(e) => props.setFilterStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Completed">Completed</option>
                        <option value="Deferred">Deferred</option>
                        </select>
                    </div>
                </div>
                <div className="right-div">
                    <form
                        className="search-box">
                        <input
                            type="search"
                            placeholder="search card"
                            value={props.search}
                            onChange={e => props.setSearch(e.target.value)}/>
                    </form>
                    <div className="cards-container">
                        {props.cardList.map((card) => {
                            return (
                                <Card 
                                    card={card}
                                    key={card.id}
                                    cardID={card.id}
                                    toggleEdit={() => toggleIsOnEditCard(card.id)}
                                    deleteCard={props.onDeleteCard}/>
                            )
                        })}
                    </div>
                    <div className="center">
                        <button onClick={toggleIsOnAddCard}>Add Card</button>
                    </div>
                </div>
            </div>
        </main>
        <div className="add-card-container">
            {isOnAddCard ? 
                <AddCard 
                    dosmthtocard={props.onAddCard}
                    mode="add" 
                    cardID={cardID}
                    card={null}/> : 
                <></>}
            {isOnEditCard ? 
                <AddCard 
                    dosmthtocard={props.onEditCard}
                    mode="edit" 
                    cardID={cardID}
                    card={props.cardList.find((c) => c.id === cardID)}/> : 
                <></>}
        </div>
        </>
    );
}

export default MainContent;