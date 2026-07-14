import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard.jsx";
import { ChevronLeft, ChevronRight, Hash, Loader2 } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `http://localhost:8080/posts/news?category=${category}&page=${page}&size=9`,
      );
      setNews(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  // Reset page when category changes
  useEffect(() => {
    setPage(0);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent"></div>
        <Hash size={48} className="text-indigo-600 mb-4" />
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          {category} News
        </h1>
        <p className="text-slate-500 mt-4 max-w-2xl font-medium">
          Discover the latest stories, updates, and deep dives relating to {category}.
        </p>
      </div>

      {/* STATUS STATES */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-semibold text-slate-600">Loading {category} news...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-500 font-bold text-lg">{error}</p>
          <button onClick={fetchNews} className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-full shadow-sm font-semibold hover:bg-indigo-50 border border-slate-200">Try Again</button>
        </div>
      )}

      {/* GRID */}
      {!loading && !error && news.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
          <Hash size={40} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700">No news found.</h2>
          <p className="text-slate-500 mt-2">Check back later for updates in this category.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && news.map((item) => <NewsCard key={item.id} {...item} />)}
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-16 mb-8">
          <button 
            disabled={page === 0} 
            onClick={() => setPage(page - 1)}
            className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-11 h-11 rounded-full font-bold text-sm transition-all ${
                  page === i 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105" 
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
