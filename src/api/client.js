import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    token: process.env.REACT_APP_FINNHUB_API_KEY,
  },
});

export default apiClient;
