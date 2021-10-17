import axios from "axios";

const api = axios.create({ baseURL: `${process.env.API_URL}` });

api.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
  }

  return req;
});

export default api;
