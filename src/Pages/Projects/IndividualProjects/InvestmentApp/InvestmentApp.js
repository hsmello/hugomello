import { useEffect, useState } from "react";
import { getQuote, getTwelveDataHistorical,  } from '../../../../api'
import { getHistoricalPrices  } from '../../../../apiTD'
import MonteCarlo from "./monteCarlo.js";
import './InvestmentApp.css'

const InvestmentApp = () => {

    const [symbol, setSymbol] = useState('AAPL')
    const [quote, setQuote] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        getQuote(symbol)
        .then((res) => setQuote(res.data))
        .catch((err) => console.error("Error fetching quote:", err));
    }, [symbol]);

    if (!quote) return <p>Loading...</p>;

    return (
        <div>
            <div className="mc-mobile-warning">
                <strong>Notice:</strong> This project is not adapted for mobile devices.<br />
                Please view on a desktop for the best experience. 
                <br />
                Thank you for your understanding!
            </div>
            < MonteCarlo />
        </div>
    );
}

export default InvestmentApp;