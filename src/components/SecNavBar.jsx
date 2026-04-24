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
    <>
      <div className="mt-15 p-2 flex flex-wrap gap-8 justify-center bg-white text-gray-700">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            to={`/category/${cat.value}`}
            className={
              location.pathname === `/category/${cat.value}`
                ? "font-bold text-gray-700"
                : ""
            }
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </>
  );
}
