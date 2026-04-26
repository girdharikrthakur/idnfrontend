import { useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "./NavBar.jsx";
import SecNavBar from "./SecNavBar.jsx";
import Sidebar from "./SideBar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  // 1. More descriptive state variable names
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Safer state update using the previous state (prev)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 3. Grouping navigation elements inside a semantic <header> */}
      <header>
        <Navbar toggle={toggleSidebar} />
        <SecNavBar />
      </header>

      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* 4. Using the semantic <main> tag instead of a <div> */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
