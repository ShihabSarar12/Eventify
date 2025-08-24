import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Mock data (replace with API later)
const ALL_EVENTS = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image:
      "https://i0.wp.com/whataftercollege.com/wp-content/uploads/2018/03/Techfest-featured-Image.jpg?fit=800%2C418",
    description:
      "Technology festival featuring keynotes, hackathons, and showcases. Network with peers and experts!",
  },
  {
    id: 2,
    title: "Music Night",
    date: "2025-09-20",
    location: "Open Ground",
    category: "Music",
    image: "https://source.unsplash.com/800x500/?music,concert",
    description:
      "An evening of live music and cultural performances under the stars.",
  },
  {
    id: 3,
    title: "Robotics Workshop",
    date: "2025-09-25",
    location: "Lab 101",
    category: "Workshop",
    image: "https://source.unsplash.com/800x500/?robotics,workshop",
    description:
      "Build, code, and test your own robots. Perfect for beginners and enthusiasts.",
  },
  {
    id: 4,
    title: "AI for Everyone",
    date: "2025-10-05",
    location: "CS Hall",
    category: "Technology",
    image: "https://source.unsplash.com/800x500/?artificial,intelligence",
    description:
      "Friendly introduction to AI concepts, demos, and how to get started.",
  },
  {
    id: 5,
    title: "Open Mic Night",
    date: "2025-10-10",
    location: "Community Center",
    category: "Culture",
    image: "https://source.unsplash.com/800x500/?openmic,stage",
    description:
      "Poetry, stand-up, and stories. New voices welcome—sign up to perform!",
  },
];

const CATEGORIES = ["All", "Technology", "Music", "Workshop", "Culture"];

function EventCard({ event }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md hover:border-white/20 transition overflow-hidden">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-slate-300 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-slate-300">Date</p>
            <p className="font-medium text-white">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-slate-300">Category</p>
            <p className="font-medium text-white">{event.category}</p>
          </div>
        </div>

        <div className="mt-3 text-sm text-slate-300">
          <span className="text-slate-400">Location: </span>
          <span className="text-white">{event.location}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
          >
            View Details
          </Link>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">
            {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("date-asc"); // date-asc | date-desc | title-asc
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = useMemo(() => {
    let list = [...ALL_EVENTS];

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((e) =>
        [e.title, e.description, e.location].some((v) =>
          v.toLowerCase().includes(q)
        )
      );
    }

    if (category !== "All") {
      list = list.filter((e) => e.category === category);
    }

    if (startDate) {
      const s = new Date(startDate);
      list = list.filter((e) => new Date(e.date) >= s);
    }
    if (endDate) {
      const ed = new Date(endDate);
      list = list.filter((e) => new Date(e.date) <= ed);
    }

    list.sort((a, b) => {
      if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [query, category, sort, startDate, endDate]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("date-asc");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Explore Events
          </h1>
          <p className="text-slate-300">
            Discover and register for exciting club events.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Search
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, or location"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-xs font-medium text-slate-300">
              From
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              To
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">Sort:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSort("date-asc")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sort === "date-asc"
                    ? "bg-neutral-900/95 text-white ring-1 ring-white/20"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                Date ↑
              </button>
              <button
                onClick={() => setSort("date-desc")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sort === "date-desc"
                    ? "bg-neutral-900/95 text-white ring-1 ring-white/20"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                Date ↓
              </button>
              <button
                onClick={() => setSort("title-asc")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sort === "title-asc"
                    ? "bg-neutral-900/95 text-white ring-1 ring-white/20"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                Title A–Z
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center">
            <p className="text-slate-300">
              No events match your filters. Try adjusting the search or dates.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
