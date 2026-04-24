import { useState, useEffect } from "react";
import { getPosts } from "../api/adminApis";

export default function PostCard() {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getPosts(cursor, 10);

      setPosts((prev) => [...prev, ...res.data.data]);
      setCursor(res.data.nextCursor);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="bg-gray-100">
      {posts.length === 0 ? (
        <div className="bg-blue-100 p-4 text-center">
          <h3 className="font-bold">No Posts Available</h3>
          <p className="text-sm text-gray-500">
            Create your first post to get started 🚀
          </p>
        </div>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {hasMore && (
        <button onClick={loadPosts} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
