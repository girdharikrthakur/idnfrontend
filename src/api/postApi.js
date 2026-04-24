import api from "./axios";

export const getPosts = (cursor, limit) => {
  return api.get("/posts", {
    params: {
      cursor,
      limit,
    },
  });
};
export const fetchPostbyId = (data) => {
  api.get("/posts/${id}", data);
};
export const mostViewdPost = (data) => {
  api.get("/posts/most-viewed", data);
};
export const trendingPost = (data) => {
  api.get("/posts/trending", data);
};

export const search = (keyword, category) => {
  return api.get("/posts/search", {
    params: {
      keyword,
      category,
    },
  });
};
