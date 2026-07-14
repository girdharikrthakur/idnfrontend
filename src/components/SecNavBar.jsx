import { Link, useLocation } from "react-router-dom";

export default function SecNavBar() {
  const location = useLocation();

  const categories = [
    { name: "Army", value: "army" },
    { name: "Navy", value: "navy" },
    { name: "Air Force", value: "airforce" },
    { name: "Space", value: "space" },
    { name: "India", value: "india" },
    { name: "World", value: "world" },
  ];

  return (
    <div className="fixed top-14 w-full z-40 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 shadow-md transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-start lg:justify-center overflow-x-auto hide-scrollbar">
          {categories.map((cat) => {
            const isActive = location.pathname === `/category/${cat.value}`;
            return (
              <Link
                key={cat.value}
                to={`/category/${cat.value}`}
                className={`whitespace-nowrap px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200 border-b-2
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-white/5 hover:text-orange-500 dark:hover:text-orange-400"
                  }
                `}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
