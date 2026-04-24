import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal.jsx";
import { Search } from "lucide-react";

function Navbar({ toggle }) {
  const [user, setUser] = useState({
    isAdmin: false,
    loggedIn: false,
    username: null,
    roles: [],
    dpUrl: "",
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch("http://localhost:8080/api/me", {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      console.log("USER:", data);
      setUser(data);
    } catch (err) {
      console.error("ERROR:", err.message);

      setUser({
        isAdmin: false,
        loggedIn: false,
        username: null,
        roles: [],
        dpUrl: null,
      });
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchUser();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
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
    <div className="fixed top-0 z-40 w-full">
      <div className="flex bg-black">
        {/* LEFT */}
        <div className="flex gap-4 p-4 text-white w-[50%]">
          <button onClick={toggle} className="text-2xl">
            ☰
          </button>

          <Link className="font-black text-2xl text-center" to="/">
            IDN
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex p-4 text-white justify-end w-[50%] gap-2">
          <div className="flex justify-between items-center shadow">
            {/* 🔍 Icon */}
            <button onClick={() => setOpen(true)}>
              <Search className="w-6 h-6" />
            </button>

            {/* 🔍 Modal */}
            <SearchModal open={open} onClose={() => setOpen(false)} />
          </div>
          <nav className="flex gap-4 items-center">
            {user.loggedIn && user.isAdmin && !isDashboardPage && (
              <Link
                to="/dashboard"
                className="bg-blue-600 h-8 px-3 rounded-sm flex items-center"
              >
                Dashboard
              </Link>
            )}

            {!user.loggedIn && (
              <>
                <Link
                  to="/login"
                  className="bg-gray-600 h-8 w-14 rounded-sm flex items-center justify-center"
                >
                  Login
                </Link>

                <Link to="/signup">Sign Up</Link>
              </>
            )}

            {user.loggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 h-8 px-3 rounded-sm"
                >
                  Logout
                </button>
                <span className="text-sm font-bold text-gray-300">
                  {user.username}
                </span>

                <img
                  src={user.dpUrl}
                  alt="no dp"
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
