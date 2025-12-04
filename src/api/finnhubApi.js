// src/api/finnhubApi.js
import apiClient from "./client";

// Get stock quote
export const getQuote = (symbol) => apiClient.get("/quote", { params: { symbol } });

// Get company profile
export const getCompanyProfile = (symbol) =>
  apiClient.get("/stock/profile2", { params: { symbol } });

// Get market news
export const getMarketNews = (category = "general") =>
  apiClient.get("/news", { params: { category } });

// Get peers for a stock
export const getPeers = (symbol) => apiClient.get("/stock/peers", { params: { symbol } });

// Historical candles (OHLCV) (D for daily)
export const getHistoricalPrices = async (symbol) => {
  try {
    const res = await apiClient.get("/quote", { params: { symbol } });
    const quote = res.data;
    const timestamp = Date.now();

    // Load existing history
    const key = `quote_history_${symbol}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];

    // Add new data point
    const newPoint = { time: timestamp, price: quote.c };
    const updatedHistory = [...history, newPoint].slice(-100);

    // Save updated history
    localStorage.setItem(key, JSON.stringify(updatedHistory));

    return updatedHistory;
  } catch (err) {
    console.error("Error fetching quote:", err);
    return null;
  }
};

export const getTwelveDataHistorical = async (symbol) => {
  const apiKey = "YOUR_KEY"; // free signup
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.values.map(v => ({
    time: new Date(v.datetime),
    close: parseFloat(v.close)
  }));
};
