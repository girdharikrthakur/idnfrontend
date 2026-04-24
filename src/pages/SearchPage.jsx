import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { search } from "../api/postApi";

export default function SearchPage() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);

    const currentPage = page;

    search({ keyword, page: currentPage, size: 10 })
      .then((res) => {
        setPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [keyword, page]);

  useEffect(() => {
    setPage(0);
  }, [keyword]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 🔹 Title */}
      <h2 className="text-2xl font-semibold mb-6">
        Results for: <span className="font-bold text-blue-600">{keyword}</span>
      </h2>

      {/* 🔹 Loading */}
      {loading && <p className="text-gray-500">Searching...</p>}

      {/* 🔹 No Results */}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No results found</p>
      )}

      {/* 🔹 Results */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/article/${post.id}`)}
            className="border p-4 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{post.category}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            ← Prev
          </button>

          <span className="text-sm text-gray-600">
            Page <span className="font-semibold">{page + 1}</span> of{" "}
            {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
