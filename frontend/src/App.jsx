import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Suspense,
  lazy,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Bg from "./components/Bg"; // animated background component

/* ===============================
   Auth Context
   ================================= */
const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role }

  useEffect(() => {
    const saved = localStorage.getItem("eventify_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("eventify_user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventify_user");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ===============================
   Route Guard
   ================================= */
function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/student"} replace />
    );
  }
  return children;
}

/* ===============================
   Lazy-loaded Pages
   ================================= */
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EventForm = lazy(() => import("./pages/EventForm"));
const Explore = lazy(() => import("./pages/Explore")); // NEW

/* ===============================
   Helpers
   ================================= */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
      <span className="ml-3 text-slate-500">Loading…</span>
    </div>
  );
}

/* ===============================
   Layout Shell
   ================================= */
function Shell({ children }) {
  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden">
      {/* Animated background */}
      <Bg className="fixed inset-0 -z-10" />

      {/* Foreground content */}
      <div className="flex flex-col relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full mx-auto max-w-[1600px] px-6 py-10 lg:px-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-70 border-t border-white/10 py-8">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()} Eventify — University Club Event
              Management Platform.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ===============================
   App Router
   ================================= */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Shell>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events/preview" element={<Explore />} /> {/* NEW */}
              <Route path="/events/:id" element={<EventDetails />} />

              {/* Student */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <EventForm mode="create" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit/:id"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <EventForm mode="edit" />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Shell>
      </AuthProvider>
    </BrowserRouter>
  );
}

/* ===============================
   NotFound Page
   ================================= */
function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
      <h1 className="text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-slate-300">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
