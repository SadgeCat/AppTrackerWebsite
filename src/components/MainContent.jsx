import { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";

const MainContent = (props) => {
    const [isOnAddCard, setIsOnAddCard] = useState(false);
    const [isOnEditCard, setIsOnEditCard] = useState(false);
    const [cardID, setCardID] = useState(null);
    const [search, setSearch] = useState("");
    const [cardList, setCardList] = useState(props.cardList);

    const toggleIsOnAddCard = () => {
        setIsOnAddCard(!isOnAddCard);
        setIsOnEditCard(false);
    }
    const toggleIsOnEditCard = (newID) => {
        setIsOnEditCard(!isOnEditCard);
        setIsOnAddCard(false);
        setCardID(newID);
    }

    const HandleSearch = e => {
        e.preventDefault();
        console.log(search);
        FetchCard(search);
    }
    const FetchCard = async (query) => {
        const filteredCards = cardList.filter((card) =>
            card.title.toLowerCase().includes(query.toLowerCase())
        );
        console.log(filteredCards);
        setCardList(filteredCards);
        if(query === "") setCardList(props.cardList);
    }

    return (
        <>
        <main>
            <h1 className="title">Application Dashboard</h1>
            <form
                className="search-box"
                onSubmit={HandleSearch}>
                <input
                    type="search"
                    placeholder="search card"
                    value={search}
                    onChange={e => setSearch(e.target.value)}/>
            </form>
            <div className="cards-container">
                {cardList.map((card) => {
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