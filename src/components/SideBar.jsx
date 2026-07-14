import { Link } from "react-router-dom";
import { X, Home, PenTool, Mail, Info } from "lucide-react";

function Sidebar({ isOpen, toggle }) {
  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggle}
        />
      )}
      
      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-80 bg-white dark:bg-[#111111] border-r border-slate-200 dark:border-white/10 shadow-2xl transform z-[70]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10">
          <div className="bg-orange-500 text-white font-bold font-serif text-2xl tracking-tighter px-2.5 py-0.5 leading-none shadow-md">
            IDN
          </div>
          <button 
            onClick={toggle} 
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="p-4 space-y-2 mt-4 font-medium text-slate-700 dark:text-slate-300">
          <li>
            <Link onClick={toggle} to="/" className="flex items-center gap-4 p-3 rounded hover:bg-orange-50 dark:hover:bg-white/5 hover:text-orange-500 transition-colors">
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link onClick={toggle} to="/editor" className="flex items-center gap-4 p-3 rounded hover:bg-orange-50 dark:hover:bg-white/5 hover:text-orange-500 transition-colors">
              <PenTool size={20} />
              Post Editor
            </Link>
          </li>
          <li>
            <Link onClick={toggle} to="/contact" className="flex items-center gap-4 p-3 rounded hover:bg-orange-50 dark:hover:bg-white/5 hover:text-orange-500 transition-colors">
              <Mail size={20} />
              Contact
            </Link>
          </li>
          <li>
            <Link onClick={toggle} to="/about" className="flex items-center gap-4 p-3 rounded hover:bg-orange-50 dark:hover:bg-white/5 hover:text-orange-500 transition-colors">
              <Info size={20} />
              About
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
