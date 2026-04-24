import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard.jsx";

const CategoryPage = () => {
  const { category } = useParams();

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset page when category changes
  useEffect(() => {
    setPage(0);
  }, [category]);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `http://localhost:8080/posts/news?category=${category}&page=${page}&size=5`,
      );

      setNews(res.data.content);
      console.log(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200 rounded-xl">
        <h1 className="text-center font-bold pt-8">
          {category.toUpperCase()} NEWS
        </h1>

        {/* Loading */}
        {loading && <p className="text-center">Loading...</p>}

        {/* Error */}
        {error && <p className="text-gray-400 text-center">{error}</p>}

        {/* News List */}
        <div className="news-container">
          {!loading &&
            news.map((item) => <NewsCard key={item.id} news={item} />)}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 0 && (
          <div style={{ marginTop: "20px" }}>
            {/* Prev */}
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  fontWeight: page === i ? "bold" : "normal",
                  margin: "0 5px",
                }}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
