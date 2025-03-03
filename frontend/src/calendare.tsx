import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useAppContext } from './context/AppContext';

const fakeEvents = [
  { title: "Meeting with Team", description: "Discuss project progress", date: "2025-03-05" },
  { title: "Project Deadline", description: "Finalize all tasks", date: "2025-03-10" },
  { title: "Company Event", description: "Annual gathering", date: "2025-03-15" },
  { title: "Client Presentation", description: "Showcase new features", date: "2025-03-20" },
];

const DemoApp = () => {
  const [events, setEvents] = useState(fakeEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
  const { user } = useAppContext();

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, date: arg.dateStr });
    setOpen(true);
  };

  const handleSubmit = () => {
    setEvents([...events, newEvent]);
    setOpen(false);
    setNewEvent({ title: '', description: '', date: '' });
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Hi {user?.name} 👋 </h1>
      <h1 className="text-2xl font-bold mb-5">Event Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: `${event.title} - ${event.description}`,
          date: event.date,
        }))}
        dateClick={handleDateClick}
      />
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-3">Add Event</h2>
            <label className="block text-sm font-medium">Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="border p-2 rounded w-full mb-3"
            />
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="border p-2 rounded w-full mb-3"
            />
            <p className="text-sm mb-3">Date: {newEvent.date}</p>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Add Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoApp;
