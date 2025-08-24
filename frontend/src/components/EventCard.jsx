import React from "react";
import { Link } from "react-router-dom";
import SpotlightCard from "./SpotLightCard";

export default function EventCard({ event }) {
  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md hover:border-white/20 transition">
        {/* Image */}
        {event?.image && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {event.title}
          </h3>

          <div className="mt-2 space-y-1.5 text-sm">
            <p className="text-slate-300">
              <span className="text-slate-400">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-slate-300">
              <span className="text-slate-400">Location:</span> {event.location}
            </p>
            <p className="text-slate-300">
              <span className="text-slate-400">Category:</span>{" "}
              <span className="text-blue-400">{event.category}</span>
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition"
            >
              View Details
            </Link>

            {/* Optional secondary action */}
            {/* <button className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition">
              Save
            </button> */}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
