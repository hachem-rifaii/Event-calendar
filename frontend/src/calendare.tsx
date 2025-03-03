import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useAppContext } from './context/AppContext';


const fakeEvents = [
  { title: "Meeting with Team", date: "2025-03-05" },
  { title: "Project Deadline", date: "2025-03-10" },
  { title: "Company Event", date: "2025-03-15" },
  { title: "Client Presentation", date: "2025-03-20" },
];

const DemoApp = () => {
  const [events, setEvents] = useState(fakeEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, date: arg.dateStr });
    setOpen(true);
  };

  const handleSubmit = () => {
    setEvents([...events, newEvent]);
    setOpen(false);
  };
const {user} = useAppContext()
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Hi {user?.name} 👋 </h1>
      <h1 className="text-2xl font-bold mb-5">Event Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <label className="block text-sm font-medium">Event Title</label>
            <input 
              type="text" 
              value={newEvent.title} 
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
              className="border p-2 rounded w-full"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-3">
              Add Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoApp;