import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../App";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Crisp labels and reliable contrast
  const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2 text-sm font-medium tracking-tight transition ${
      isActive
        ? "bg-neutral-900/95 text-white ring-1 ring-white/20 shadow-sm"
        : "text-slate-200 hover:bg-white/10 hover:text-white"
    }`;

  // Explicit text-white so labels never disappear
  const primaryBtn =
    "rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold tracking-tight text-white hover:bg-blue-500 ring-1 ring-white/10 transition";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-2xl bg-blue-600 text-xs font-bold text-white">
            Ev
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-white">
            Eventify
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/events/Explore" className={navLinkClass}>
            Explore
          </NavLink>

          {user?.role === "student" && (
            <NavLink to="/student" className={navLinkClass}>
              Student
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={primaryBtn}>
                Login
              </NavLink>
              <NavLink to="/signup" className={primaryBtn}>
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={logout} className={primaryBtn}>
              Logout
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="border-t border-white/10 bg-black/85 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/events/preview"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Explore
            </NavLink>

            {user?.role === "student" && (
              <NavLink
                to="/student"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                Student
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                Admin
              </NavLink>
            )}

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={primaryBtn}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className={primaryBtn}
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white hover:bg-blue-500 ring-1 ring-white/10 transition md:text-[14px]"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
