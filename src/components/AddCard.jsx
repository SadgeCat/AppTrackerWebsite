import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const PickDateComponent = ({ selectedDate, setSelectedDate }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
        />
    );
};

const AddCard = ({dosmthtocard, filtercard, filtertype, mode, cardID, card}) => {
    const [selectedDate, setSelectedDate] = useState(card?.deadline || new Date());
    const [title, setTitle] = useState(card?.title || "");
    const [desc, setDesc] = useState(card?.desc || "");
    const [status, setStatus] = useState(card?.status || "In Progress");
    const [type, setType] = useState(card?.type || "School");

    const swtch = mode === "add" ? true : false;
    const h2Text = swtch ? "Add New Application" : "Edit Application";
    const titleText = swtch ? "Title:" : "Edit Title:";
    const descText = swtch ? "Description:" : "Edit Description";
    const statusText = swtch ? "Status:" : "Edit Status:";
    const typeText = swtch ? "Type:" : "Edit Type:";
    const btnText = swtch ? "Add" : "Edit";

    return (
        <div className="add-card">
            <h2>{h2Text}</h2>
            
            <div className="input-group">
                <label>{titleText}
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </label>
            </div>

            <div className="input-group">
                <label>{descText}
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                </label>
            </div>

            <div className="input-group">
                <label>Deadline:
                    <PickDateComponent
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}/>
                </label>
            </div>

            <div className="input-group">
                <label>{statusText}
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Completed">Completed</option>
                        <option value="Deferred">Deferred</option>
                    </select>
                </label>
            </div>

            <div className="input-group">
                <label>{typeText}
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="School">School</option>
                        <option value="Work">Work</option>
                        <option value="Family">Family</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Trip">Trip</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>

            <button id="add-button" onClick={() => dosmthtocard(cardID, title, desc, selectedDate, status, type)}>{btnText}</button>
        </div>
    );
};

export default AddCard;