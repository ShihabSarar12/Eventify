import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useAuth } from "../App";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image: "https://source.unsplash.com/600x400/?technology,conference",
    participants: 42,
  },
  {
    id: 2,
    title: "Startup Pitch",
    date: "2025-09-22",
    location: "Innovation Hub",
    category: "Business",
    image: "https://source.unsplash.com/600x400/?startup,pitch",
    participants: 30,
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {user?.name || "Admin"} 👋
          </h1>
          <p className="text-slate-300">
            Manage your events and view stats here.
          </p>
        </div>
        <Link
          to="/admin/create"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-white">Total Events</h2>
          <p className="mt-2 text-3xl font-bold text-blue-400">{events.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-white">Participants</h2>
          <p className="mt-2 text-3xl font-bold text-green-400">
            {events.reduce((sum, e) => sum + e.participants, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-white">Admins</h2>
          <p className="mt-2 text-3xl font-bold text-purple-400">1</p>
        </div>
      </section>

      {/* Manage Events */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Your Events</h2>
        {events.length === 0 ? (
          <p className="text-slate-300 text-sm">No events created yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                // Only admin actions here; no register CTA
                action={
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/admin/events/${event.id}`} 
                      className="flex-1 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition text-center"
                    >
                      Manage
                    </Link>
                    <Link
                      to={`/admin/edit/${event.id}`}
                      className="flex-1 rounded-full border border-blue-500 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-300 hover:bg-blue-500/20 transition text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 rounded-full border border-red-500 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
