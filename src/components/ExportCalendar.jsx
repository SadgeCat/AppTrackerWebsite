import React from "react";

const ExportCalendarButton = ({ cardList }) => {
    const exportICS = () => {
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//YourApp//EN\n";

        cardList.forEach((card) => {
            const startDateTime = formatDateTime(card.deadline);
            const endDateTime = formatDateTime(card.deadline, 1);

            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `UID:${card.id}@yourapp.com\n`;
            icsContent += `SUMMARY:${escapeICS(card.title)}\n`;
            icsContent += `DTSTART:${startDateTime}\n`;
            icsContent += `DTEND:${endDateTime}\n`;
            icsContent += `END:VEVENT\n`;
        });

        icsContent += "END:VCALENDAR";

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "planahead-calendar.ics";
        link.click();
    };

    const formatDateTime = (date, addHours = 0) => {
        const d = date instanceof Date ? new Date(date) : new Date(date);
        d.setHours(d.getHours() + addHours);
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const escapeICS = (text) => {
        return text.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
    };

    return (
        <button onClick={exportICS} style={{ marginTop: "10px" }}>
            📤 Export to Google Calendar
        </button>
    );
};

export default ExportCalendarButton;