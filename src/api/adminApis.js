import api from "./axios";

// ✅ Dashboard stats
export const getPostStats = () => {
  return api.get("/api/admin/dashboard/stats");
};

export const getCategoryStats = () => {
  return api.get("/api/admin/dashboard/category-stats");
};

// ✅ All posts
export const getPosts = (cursor, limit) => {
  return api.get("/api/admin/dashboard/posts", {
    params: {
      cursor,
      limit,
    },
  });
};

// ✅ Post by ID
export const getPostById = (id) => {
  return api.get(`/api/admin/posts/${id}`);
};

// ✅ Users
export const getUsers = () => {
  return api.get("/api/admin/users");
};
