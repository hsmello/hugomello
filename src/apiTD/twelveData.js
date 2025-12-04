import apiClient from "./client.js";

/**
 * Fetch historical daily close prices for a symbol
 * @param {string} symbol - stock symbol, e.g. "AAPL"
 * @param {number} days - how many days back to fetch (max 365 for free plan)
 */
export const getHistoricalPrices = async (symbol, days = 365) => {
  try {
    const res = await apiClient.get("/time_series", {
      params: {
        symbol,
        interval: "1day",
        outputsize: days,
      },
    });

    const data = res.data; // <-- Axios response data

    if (!data || !data.values) {
      console.error("No historical data returned", data);
      return [];
    }

    return data.values.map((v) => ({
      time: new Date(v.datetime),
      close: parseFloat(v.close),
    }));
  } catch (err) {
    console.error("Error fetching historical prices:", err);
    return [];
  }
};