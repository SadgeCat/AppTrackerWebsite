import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ExportCalendar from "../components/ExportCalendar";

const Calendar = ({ cardList }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const handleEventClick = (clickInfo) => {
        const card = cardList.find(c => c.id.toString() === clickInfo.event.id);
        setSelectedCard(card);
    }

    const events = cardList.map(card => ({
        id: card.id.toString(),
        title: card.title,
        date: card.deadline instanceof Date ? card.deadline.toLocaleDateString('en-CA') : new Date(card.deadline).toLocaleDateString('en-CA'),
        className: `calendar-${card.type}`
    }));

    return (
        <div className="calendar-container">
            <h2>📅 Application Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                eventClick={handleEventClick}/>
            <ExportCalendar cardList={cardList}/>

            {selectedCard && (
                <div className="modal-backdrop" onClick={() => setSelectedCard(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedCard.title}</h3>
                        <p><strong>Description:</strong> {selectedCard.desc}</p>
                        <p><strong>Deadline:</strong> {selectedCard.deadline.toLocaleDateString()}</p>
                        <button onClick={() => setSelectedCard(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;