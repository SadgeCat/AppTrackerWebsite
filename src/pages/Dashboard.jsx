import MainContent from "../components/MainContent"

const Dashboard = ({cardList, filterType, setFilterType, filterStatus, setFilterStatus, filterDate, setFilterDate, search, setSearch, onAddCard, onEditCard, onDeleteCard}) => {
    return (
        <div className="App">
            <MainContent 
                cardList={cardList}
                filterType={filterType}
                setFilterType={setFilterType}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                search={search}
                setSearch={setSearch}
                onAddCard={onAddCard}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}/>
        </div>
    );
}

export default Dashboard;