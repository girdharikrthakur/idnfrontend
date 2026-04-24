import data from "../assets/data.json";
import NewsCard from "../components/NewsCard.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useEffectEvent } from "react";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const modelShow = useEffectEvent(() => {
    setShowModal(true);
  });

  useEffect(() => {
    modelShow();
  }, []);

  return (
    <>
      {/* 🔥 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center">
            <h2 className="text-xl font-bold mb-2">🚧 Under Construction</h2>
            <p className="text-gray-600 mb-4">
              This page is still being built.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* 🔥 Main Content */}
      <div
        onClick={() => navigate(`/article/${data[0].id}`)}
        className="flex flex-wrap gap-4 mt-20 px-4"
      >
        {/* LEFT CARD */}
        <div className="w-full md:w-[48%] h-[400px] bg-gray-100 shadow rounded overflow-hidden">
          <img src={data[0].imageUrl} className="w-full h-60 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{data[0].title}</h2>
            <h1 className="text-gray-600 mt-2">{data[0].heading}</h1>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="w-full md:w-[48%] h-[400px] bg-gray-100 shadow rounded overflow-hidden">
          <img src={data[2].imageUrl} className="w-full h-60 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{data[2].title}</h2>
            <h1 className="text-gray-600 mt-2">{data[2].heading}</h1>
          </div>
        </div>
      </div>

      {/* Lower Cards */}
      <div className="mt-8 px-4">
        <div className="flex flex-wrap justify-center min-w-[400px]">
          {data.slice(0, 6).map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
