import Navbar from "./NavBar";
import SecNavBar from "./SecNavBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 dark:text-slate-100 relative overflow-x-hidden bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar toggle={toggleSidebar} />
        <SecNavBar />
        
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

        <main className="flex-1 w-full mx-auto max-w-[1600px] pt-28 pb-12 transition-colors duration-300">
          {children || <Outlet />}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
