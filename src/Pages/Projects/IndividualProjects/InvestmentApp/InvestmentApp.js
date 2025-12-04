import MonteCarlo from "./monteCarlo.js";
import './InvestmentApp.css'

const InvestmentApp = () => {

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