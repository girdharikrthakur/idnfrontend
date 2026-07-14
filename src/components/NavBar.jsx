import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal.jsx";
import api from "../api/axios.js";
import { Menu, Search, LogOut, User as UserIcon, Moon, Sun } from "lucide-react";

function Navbar({ toggle }) {
  const [user, setUser] = useState({
    isAdmin: false,
    loggedIn: false,
    username: null,
    roles: [],
    dpUrl: "",
  });

  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return; // 
    }

    try {
      const res = await api.get("/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    setIsDark(document.documentElement.classList.contains('dark'));
  }, [location.pathname]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser({
      loggedIn: false,
      username: null,
      roles: [],
      isAdmin: false,
    });
    navigate("/");
  };

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-[#111111]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* LEFT: Menu & Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggle} 
              className="p-1.5 -ml-1.5 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <Menu size={26} />
            </button>

            <Link className="flex items-center gap-3 border-l border-slate-300 dark:border-white/10 pl-4 ml-1" to="/">
              <div className="bg-orange-500 text-white font-bold font-serif text-2xl tracking-tighter px-2.5 py-0.5 leading-none shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                IDN
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 hidden sm:block tracking-widest uppercase text-xs">
                Defence
              </span>
            </Link>
          </div>

          {/* RIGHT: Search, Theme, & Auth */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded transition-colors focus:outline-none"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                onClick={() => setOpen(true)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded transition-colors focus:outline-none"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <SearchModal open={open} onClose={() => setOpen(false)} />
            </div>

            <nav className="flex items-center gap-3 sm:gap-5 border-l border-slate-300 dark:border-white/10 pl-3 sm:pl-5">
              {user.loggedIn && user.isAdmin && !isDashboardPage && (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-medium rounded hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-xs uppercase tracking-wider"
                >
                  Dashboard
                </Link>
              )}

              {!user.loggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="text-slate-600 dark:text-slate-300 font-medium hover:text-orange-500 dark:hover:text-white transition-colors text-sm"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-4 py-1.5 bg-orange-500 text-white font-medium rounded shadow hover:bg-orange-600 transition-colors text-sm"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                      {user.username}
                    </span>
                  </div>
                  {user.dpUrl ? (
                    <img
                      src={user.dpUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white border border-slate-200 dark:border-white/10">
                      <UserIcon size={16} />
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="p-2 -mr-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-white/5 rounded transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
