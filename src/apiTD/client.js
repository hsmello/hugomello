import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.twelvedata.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: process.env.REACT_APP_TWELVE_DATA_API_KEY,
  },
});

export default apiClient;
