import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggle }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform z-100
      ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
    >
      <button onClick={toggle} className="p-4 text-right text-white w-full">
        X
      </button>

      <ul className="p-4 space-y-4">
        <li>
          <Link to="/">IDN</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
          <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
