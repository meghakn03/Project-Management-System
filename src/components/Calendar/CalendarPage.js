import React, { useState } from 'react';
import './CalendarPage.css';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('not-important');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i);

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the number of days in the selected month
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    // Get the first day of the month (0 = Sunday, 1 = Monday, ...)
    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month - 1, 1).getDay();
    };

    // Function to add an event to the calendar
    const addEvent = (date, eventName, eventType) => {
        const newEvent = { date, eventName, eventType };
        setEvents([...events, newEvent]);
    };

    // Function to render events for a specific day
    const renderEventsForDay = (day) => {
        return events
            .filter(event => event.date === day)
            .map((event, index) => (
                <div
                    key={index}
                    className={`calendar-event ${event.eventType === 'important' ? 'important' : 'not-important'}`}
                >
                    {event.eventName}
                </div>
            ));
    };

    // Handle opening the modal to add an event
    const handleDateClick = (day) => {
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(selectedMonth).padStart(2, '0');
        setSelectedDate(`${selectedYear}-${formattedMonth}-${formattedDay}`);
        setIsModalOpen(true);
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (eventName) {
            addEvent(selectedDate, eventName, eventType);
            setIsModalOpen(false);
            setEventName('');
        }
    };

    // Render days for the current selected month and year
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

    const emptyCells = [...Array(firstDay).fill(null)];
    const days = [...Array(daysInMonth).keys()].map(i => i + 1);

    return (
        <div className="calendar-page">
            <h1>Calendar</h1>
            <div className="year-month-selector">
                <div className="year-selector">
                    <label>Year:</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="month-selector">
                    <label>Month:</label>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* Day Names */}
            <div className="calendar-grid day-names">
                {dayNames.map((dayName, index) => (
                    <div key={index} className="calendar-day-name">{dayName}</div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="calendar-grid">
                {emptyCells.map((_, index) => (
                    <div key={index} className="calendar-cell empty-cell"></div>
                ))}
                {days.map((day) => (
                    <div 
                        key={day} 
                        className="calendar-cell" 
                        onClick={() => handleDateClick(day)}
                    >
                        <div className="calendar-date">{day}</div>
                        {renderEventsForDay(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                    </div>
                ))}
            </div>

            {/* Event Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Event for {selectedDate}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Event Name:</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event Type:</label>
                                <select
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                >
                                    <option value="important">Important</option>
                                    <option value="not-important">Not Important</option>
                                </select>
                            </div>
                            <button type="submit">Add Event</button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
