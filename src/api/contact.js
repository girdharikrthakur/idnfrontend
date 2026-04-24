import api from "./axios";

export const saveMessage = (data) => {
  return api.post("/contact", data);
};

export const fetchContact = (cursor, size) => {
  return api.get("/contact", {
    params: { cursor, limit: size },
  });
};
