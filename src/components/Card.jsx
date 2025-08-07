import { useState, useEffect } from "react";

const Card = ({card, cardID, toggleEdit, deleteCard}) => {

    const getTimeRemaining = (dline) => {
        const now = new Date();
        const target = dline;
        const diff = target.getTime() - now.getTime();

        if (diff <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(card.deadline));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeRemaining(card.deadline));
        }, 1000);

        return () => clearInterval(interval);
    }, [card.deadline])
    
    return (
        <div className={`${timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? `card-expired-${card.type}` : `card-${card.type}`}`}>
            <div className="card-header">
                <h3>{card.title}</h3>
            </div>
            <div className="card-body">
                <p><strong>Description: </strong>{card.desc}</p>
                <p><strong>Deadline: </strong>{card.deadline.toLocaleDateString()}</p>
                <p><strong>Time Remaining: </strong>{`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds.`}</p>
                <p><strong>Status: </strong>{card.status}</p>
                <p><strong>Type: </strong>{card.type}</p>
            </div>
            <div className="edit-card">
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={() => deleteCard(cardID)}>Delete</button>
            </div>

        </div>
    );
}

export default Card;