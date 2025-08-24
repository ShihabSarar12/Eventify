import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../App";

export default function Sidebar({ links }) {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2 text-sm font-medium transition ${
      isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-full md:w-60 space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}
