import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../api/postApi";
import NewsCard from "../components/NewsCard.jsx";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);

    const currentPage = page;

    search({ keyword, page: currentPage, size: 9 })
      .then((res) => {
        setPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [keyword, page]);

  // Reset page when keyword changes
  useEffect(() => {
    setPage(0);
  }, [keyword]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent"></div>
        <Search size={48} className="text-indigo-600 mb-4" />
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Results for <span className="text-indigo-600">"{keyword}"</span>
        </h1>
        <p className="text-slate-500 mt-4 max-w-2xl font-medium">
          Found {posts.length > 0 ? "matches" : "results"} across the network for your search query.
        </p>
      </div>

      {/* STATUS STATES */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-semibold text-slate-600">Searching...</p>
        </div>
      )}

      {/* GRID */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
          <Search size={40} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700">No results found.</h2>
          <p className="text-slate-500 mt-2">Try adjusting your search terms or exploring a category.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && posts.map((item) => <NewsCard key={item.id} {...item} />)}
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
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
