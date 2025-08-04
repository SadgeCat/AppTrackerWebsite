import MainContent from "../components/MainContent"

const Dashboard = ({cardList, onAddCard, onEditCard, onDeleteCard}) => {
    return (
        <div className="App">
            <MainContent cardList={cardList} onAddCard={onAddCard} onEditCard={onEditCard} onDeleteCard={onDeleteCard}/>
        </div>
    );
}

export default Dashboard;