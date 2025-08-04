import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


// const Calendar = ({cardList}) => {
//     return (
//         <div className="calendar">
//             <h2>Calendar</h2>

//             {cardList.map((card) => (
//                 <div key={card.id}>
//                     <p>{card.title}</p>
//                     <p>{card.deadline.toLocaleDateString()}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

const Calendar = ({ cardList }) => {
    const events = cardList.map(card => ({
        id: card.id.toString(),
        title: card.title,
        date: card.deadline instanceof Date ? card.deadline.toLocaleDateString('en-CA') : new Date(card.deadline).toLocaleDateString('en-CA')
    }));

    return (
        <div className="calendar-container">
            <h2>📅 Application Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto" />
        </div>
    );
};

export default Calendar;