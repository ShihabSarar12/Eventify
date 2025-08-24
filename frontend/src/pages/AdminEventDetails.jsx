import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../App";

// Mock events data (replace with API later)
const EVENTS = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image:
      "https://i0.wp.com/whataftercollege.com/wp-content/uploads/2018/03/Techfest-featured-Image.jpg?fit=800%2C418",
    description:
      "Join us for an exciting technology festival featuring keynote speakers, hackathons, and project showcases. Network with peers and industry experts!",
    attendees: 42,
    published: true,
  },
  {
    id: 2,
    title: "Music Night",
    date: "2025-09-20",
    location: "Open Ground",
    category: "Music",
    image: "https://source.unsplash.com/800x500/?music,concert",
    description:
      "An evening filled with live music, bands, and cultural performances. Bring your friends and enjoy a night of melodies under the stars.",
    attendees: 68,
    published: false,
  },
  {
    id: 3,
    title: "Robotics Workshop",
    date: "2025-09-25",
    location: "Lab 101",
    category: "Workshop",
    image: "https://source.unsplash.com/800x500/?robotics,workshop",
    description:
      "Hands-on robotics workshop where you will build, code, and test your own robots. Perfect for beginners and enthusiasts alike.",
    attendees: 24,
    published: true,
  },
];

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // In a real app, fetch by id
  const base = useMemo(
    () => EVENTS.find((e) => e.id === Number(id)),
    [id]
  );

  const [event, setEvent] = useState(base || null);

  if (!user || user.role !== "admin") {
    // guard: only admins should be here
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Unauthorized</h2>
        <Link
          to="/"
          className="mt-4 inline-block rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Event not found</h2>
        <Link
          to="/admin"
          className="mt-4 inline-block rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    // Replace with API call
    if (confirm("Delete this event? This action cannot be undone.")) {
      // simulate deletion then navigate
      navigate("/admin");
    }
  };

  const togglePublish = () => {
    setEvent((prev) => ({ ...prev, published: !prev.published }));
  };

  const openAttendees = () => {
    alert(`Attendees (mock): ${event.attendees}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Top controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            ← Back to dashboard
          </Link>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              event.published
                ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                : "bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/30"
            }`}
          >
            {event.published ? "Published" : "Draft"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/admin/edit/${event.id}`}
            className="rounded-full border border-blue-500 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 hover:bg-blue-500/20 transition"
          >
            Edit
          </Link>
          <button
            onClick={togglePublish}
            className="rounded-full border border-indigo-500 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
          >
            {event.published ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={openAttendees}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            View attendees
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        <p className="text-slate-300">{event.description}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <p className="text-sm text-slate-300">Date</p>
            <p className="font-medium text-white">{event.date}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <p className="text-sm text-slate-300">Location</p>
            <p className="font-medium text-white">{event.location}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <p className="text-sm text-slate-300">Category</p>
            <p className="font-medium text-white">{event.category}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <p className="text-sm text-slate-300">Attendees</p>
            <p className="font-medium text-white">{event.attendees}</p>
          </div>
        </div>
      </div>

      {/* Secondary controls (optional quick actions) */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={`/admin/edit/${event.id}`}
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          Edit event
        </Link>
        <button
          onClick={togglePublish}
          className="rounded-full border border-indigo-500 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
        >
          {event.published ? "Mark as draft" : "Publish now"}
        </button>
        <button
          onClick={handleDelete}
          className="rounded-full border border-red-500 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
        >
          Delete event
        </button>
      </div>
    </div>
  );
}
