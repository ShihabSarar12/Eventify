import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "General",
    image: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Load event data if editing (mock for now)
  useEffect(() => {
    if (mode === "edit" && id) {
      const mockEvent = {
        id,
        title: "Tech Fest 2025",
        date: "2025-09-15",
        location: "Auditorium A",
        category: "Technology",
        image: "https://source.unsplash.com/600x400/?technology,conference",
        description: "An exciting festival of technology and innovation!",
      };
      setForm(mockEvent);
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "create") {
      console.log("✅ Creating new event:", form);
    } else {
      console.log("✏️ Updating event:", form);
    }

    navigate("/admin"); // redirect after save
  };

  return (
    <div className="mx-auto w-screen max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-white">
        {mode === "create" ? "Create New Event" : "Edit Event"}
      </h1>
      <p className="mt-1 text-sm text-slate-300">
        {mode === "create"
          ? "Fill in the details to create a new event."
          : "Update your event details below."}
      </p>

      {error && (
        <div className="mt-3 rounded-lg bg-red-500/15 text-red-300 ring-1 ring-red-500/30 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-200">
            Title <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="Event title"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Date <span className="text-red-300">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Location <span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
              placeholder="e.g. Auditorium A"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
          >
            <option className="bg-neutral-900">General</option>
            <option className="bg-neutral-900">Technology</option>
            <option className="bg-neutral-900">Workshop</option>
            <option className="bg-neutral-900">Business</option>
            <option className="bg-neutral-900">Music</option>
            <option className="bg-neutral-900">Sports</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="Describe your event..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {mode === "create" ? "Create Event" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
