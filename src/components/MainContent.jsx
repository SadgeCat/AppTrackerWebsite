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