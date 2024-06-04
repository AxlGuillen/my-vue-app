import axios from "axios";

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Añadir un interceptor para incluir el token de autenticación en cada solicitud
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Métodos para autenticación
  login(credentials) {
    return apiClient.post("/login", credentials);
  },
  register(userInfo) {
    return apiClient.post("/register", userInfo);
  },

  // Métodos para CRUD de News
  getNews() {
    return apiClient.get("/api/news");
  },
  getNewsById(id) {
    return apiClient.get(`/api/news/${id}`);
  },
  createNews(newsData) {
    return apiClient.post("/api/news", newsData);
  },
  updateNews(id, newsData) {
    return apiClient.put(`/api/news/${id}`, newsData);
  },
  deleteNews(id) {
    return apiClient.delete(`/api/news/${id}`);
  },
};
