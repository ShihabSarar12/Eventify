import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../App";

// Mock events data (replace with API later)
const events = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image: "https://i0.wp.com/whataftercollege.com/wp-content/uploads/2018/03/Techfest-featured-Image.jpg?fit=800%2C418",
    description:
      "Join us for an exciting technology festival featuring keynote speakers, hackathons, and project showcases. Network with peers and industry experts!",
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
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const event = events.find((e) => e.id === parseInt(id));
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (user) {
      const registered = JSON.parse(
        localStorage.getItem("registered_" + user.id) || "[]"
      );
      setIsRegistered(registered.includes(event?.id));
    }
  }, [user, event]);

  const handleRegister = () => {
    if (!user) return alert("Please login first.");
    const key = "registered_" + user.id;
    const registered = JSON.parse(localStorage.getItem(key) || "[]");
    if (!registered.includes(event.id)) {
      registered.push(event.id);
      localStorage.setItem(key, JSON.stringify(registered));
      setIsRegistered(true);
    }
  };

  const handleUnregister = () => {
    const key = "registered_" + user.id;
    const registered = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = registered.filter((eid) => eid !== event.id);
    localStorage.setItem(key, JSON.stringify(updated));
    setIsRegistered(false);
  };

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Event not found</h2>
        <Link
          to="/"
          className="mt-4 inline-block rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Banner Image */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        <p className="text-slate-300">{event.description}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm">
            <p className="text-sm text-slate-300">Date</p>
            <p className="font-medium text-white">{event.date}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm">
            <p className="text-sm text-slate-300">Location</p>
            <p className="font-medium text-white">{event.location}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm">
            <p className="text-sm text-slate-300">Category</p>
            <p className="font-medium text-white">{event.category}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm">
            <p className="text-sm text-slate-300">Organized by</p>
            <p className="font-medium text-white">University Club</p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div>
        {isRegistered ? (
          <button
            onClick={handleUnregister}
            className="w-full rounded-full bg-red-500/15 px-4 py-3 font-semibold text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/20 transition"
          >
            Unregister from Event
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="w-full rounded-full bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
          >
            Register for Event
          </button>
        )}
      </div>
    </div>
  );
}
