import { useEffect, useState } from "react";
import { getHistoricalPrices  } from '../../../../apiTD/index.js'

import BasicAlerts from '../../../../Components/Alert.js';
import Box from '../../../../Components/Box.js';
import Dropdown from '../../../../Components/Dropdown.js';
import MyTextField from '../../../../Components/TextField.js';
import MyLineChart from '../../../../Components/LineChart.js';
import MyBarChart from '../../../../Components/StackedBar.js';
import Button from '../../../../Components/Button.js';
import './InvestmentApp.css'

/*
Monte Carlo
Get the past X days of prices
Calculate prob that price increases by X% through Monte Carlo by end of week

Do 10 thousand simulations based on cumulative until end of week.

Assumption of normality. Get simulation absed on price change average and daily std dev. 
*/
// generate random normal number using Box-Muller transform
function randomNormal(mean = 0, std = 1) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * std + mean;
}

// simulate 5-day future prices based on last price
function monteCarloSimulation(lastPrice, avgChange, stdDev, days = 5, simulations = 10000) {
  const results = [];
  
  for (let i = 0; i < simulations; i++) {
    let price = lastPrice;
    for (let d = 0; d < days; d++) {
      price += randomNormal(avgChange, stdDev);
    }
    results.push(price);
  }

  return results;
}

const HistoricalChart = () => {

    const [triggerAlert, setTriggerAlert] = useState(null);
    const [barChartData, setBarChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [priceHistorical, setPriceHistorical] = useState([])
    
    const [symbol, setSymbol] = useState('AAPL')
    const [historicalTime, setHistoricalTime] = useState(90)
    const [futureTime, setFutureTime] = useState(5)
    const [numberOfSimulations, setNumberOfSimulations] = useState(10000)
    const [increaseTest, setIncreaseTest] = useState(1)

    const [runTrigger, setRunTrigger] = useState(0);

    const [probabilityIncrease, setProbabilityIncrease] = useState(0)

    const [pendingSymbol, setPendingSymbol] = useState('AAPL');
    const [pendingIncreaseTest, setPendingIncreaseTest] = useState(increaseTest);
    const [pendingHistoricalTime, setPendingHistoricalTime] = useState(historicalTime);
    const [pendingFutureTime, setPendingFutureTime] = useState(futureTime);
    const [pendingSimulations, setPendingSimulations] = useState(numberOfSimulations);

    const symbolOptions = [{value:'AAPL', label:'Apple'},
                            {value:'MSFT', label:'Microsoft'},
                            {value:'BRK.A', label:'Berkshire Hathway'},
                            {value:'GOOGL', label:'Google'},
                            {value:'JNJ', label:'Johnson & Johnson'},
                            {value:'MCD', label:'McDonalds'},
                            {value:'PFE', label:'Pfizer'}]
    useEffect(() => {
        getHistoricalPrices(symbol, historicalTime).then((data) => {
            
            const priceHistorical = data.map((d, i) => ({
                price: d.close,
                priceChange: i === 0 ? 0 : d.close - data[i - 1].close
            }));

            setPriceHistorical(priceHistorical)
        
            const formattedLineChart = [
                {
                id: symbol,
                data: data.slice().reverse().map((d) => ({
                    x:  d.time.toJSON().substring(0,10),
                    y: d.close,
                })),
                },
            ];
            
            setLineChartData(formattedLineChart);
            
        });
    }, [symbol, runTrigger]);

    useEffect(() => {
        /* Calculate average and std dev of priceChange */
        if (!priceHistorical || priceHistorical.length === 0) return;

        const changes = priceHistorical.map(d => d.priceChange);
        const avg = changes.reduce((sum, val) => sum + val, 0) / changes.length;
        const variance = changes.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / changes.length;
        const std = Math.sqrt(variance);
        
        setBarChartData(changes);

        // --- Monte Carlo simulation
        const lastPrice = priceHistorical[0].price;
        const mcResults = monteCarloSimulation(lastPrice, avg, std, futureTime, numberOfSimulations);
        const mcAverage = mcResults.reduce((sum, val) => sum + val, 0) / mcResults.length;

        console.log(`Monte Carlo average price in ${futureTime} days:`, mcAverage);

        const thresholdPrice = lastPrice * (1 + increaseTest/100); // price we want to exceed
        const probabilityIncrease = mcResults.filter(p => p >= thresholdPrice).length / mcResults.length;

        setProbabilityIncrease(probabilityIncrease*100)

        console.log(`Probability of ${increaseTest}% increase in ${futureTime} days:`, probabilityIncrease * 100, "%");

    }, [priceHistorical, runTrigger]);

    useEffect(() => {
    if (triggerAlert) {
        const timer = setTimeout(() => setTriggerAlert(null), 3000);
        return () => clearTimeout(timer);
    }
    }, [triggerAlert]);

    function handleMonteCarloClick() {
        if (pendingHistoricalTime <= 0 || pendingFutureTime <= 0 || pendingSimulations <= 0) {
            setTriggerAlert({
                label: "All time values and number of simulations must be positive.",
                type: "error"
            })
            return;
        }
        if (pendingIncreaseTest < 1) {
            setTriggerAlert({
            label: "Threshold must be at least 1%.",
            type: "error"
            });
            return;
        }
        if (pendingSimulations > 15000) {
            setTriggerAlert({
                label: "Number of Simulations should be no higher than 15'000.",
                type: "error"
            })
            return;
        }
        if (pendingFutureTime > 30) {
            setTriggerAlert({
                label: "The time in the future should be no further than 30 days.",
                type: "error"
            })
            return;
        }
        if (pendingHistoricalTime > 360) {
            setTriggerAlert({
                label: "The historical time should be no higher than 360 days.",
                type: "error"
            })
            return;
        }
        // Update Values
        setIncreaseTest(pendingIncreaseTest);
        setHistoricalTime(pendingHistoricalTime);
        setFutureTime(pendingFutureTime);
        setNumberOfSimulations(pendingSimulations);
        setSymbol(pendingSymbol)
        // Trigger model
        setRunTrigger((prev) => prev + 1);
        setTriggerAlert({
            label: "You have a new Monte Carlo simulation!",
            type: "success"
        })
        return;
    }


    return (
        <div className="mc-dashboard">
        {triggerAlert && (
            <BasicAlerts label={triggerAlert.label} type={triggerAlert.type} />
        )}
        <div className="mc-main">
            {triggerAlert && (
            <BasicAlerts label={triggerAlert.label} type={triggerAlert.type} />
            )}
            <div className='mc-introduction'>
                <Box width={1200} height={200} bgColor={'#141a28'}>
                    <div className='introduction-title'>
                    Real-time metrics
                    </div>
                    <div className='introduction-text'>
                        Real-time market information is essential for any business operating in fast-moving environments, as it enables colleagues and/or clients—to act on timely, accurate insights when timing can be crucial. Using live data, it is possible to either show the data itself or go a step further and calculate indicators with it -- such as volatility estimates, value-at-risk (VaR), option Greeks (delta, gamma, theta, vega), and price-distribution forecasts. 
                        <br/> <br/>
                        This project showcases a Monte Carlo simulation powered by an API that streams real stock prices, always up-to-date.
                    </div>
                </Box> 
            </div>
            <div className="mc-section">
                <Box width={1200} height={150}>
                    <div className="mc-component-title">
                        Control Panel
                    </div>
                    <div className="mc-control-body">
                    <Dropdown
                        label="Stock"
                        options={symbolOptions}
                        value={pendingSymbol}
                        onChange={(e) => {setPendingSymbol(e.target.value)}}
                        minWidth={175}
                    />
                    <MyTextField
                        label="Increase Threshold (%)"
                        width={175}
                        value={pendingIncreaseTest}
                        type="number"
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPendingIncreaseTest(val);
                        }}
                    />
                    <MyTextField
                        label="Historical time"
                        width={175}
                        value={pendingHistoricalTime}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPendingHistoricalTime(val);
                        }}
                        type="number"
                        />
                    <MyTextField
                        label="Future time"
                        width={175}
                        value={pendingFutureTime}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPendingFutureTime(val);
                        }}
                        type="number"
                        />
                    <MyTextField
                        label="Number of simulations"
                        width={175}
                        value={pendingSimulations}
                        type="number"
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setPendingSimulations(val);
                        }}
                        inputProps={{
                            min: 0,
                            max: 10,
                        }}
                    />
                    <Button label={'Run'} onClick={handleMonteCarloClick}/>

                    </div>
                </Box>
            </div>
            <div className="mc-section mc-row">
                <Box height={370} width={1200}>
                    <div className="mc-component-title">
                        Monte Carlo Simulation
                    </div>
                    <div className="mc-component-body mc-text">
                        The Monte Carlo simulation is a statistical technique used to model the probability of different outcomes in a process that is inherently uncertain — in this case, true stock price movements that is fetched from <a href="https://twelvedata.com/" target="_blank"  rel="noopener noreferrer" style={{ color: "#6CA8FF" }}> Twelve Data API</a>. <br /> <br />

                        This methodology assumes normal distribution of values to be simulated. Thus, below you can see the histogram of price changes in the past {historicalTime} days. A second key assumption is that each daily price change is independent and random. This is a stronger assumption, and it highlights that this simulation should not be used as the sole method for forecasting stock prices, but the math and charts do make it fun!. <br /> <br />
                        
                        <strong>Well, now you can try by yourself!</strong> Feel free to change the boxes from the Control Panel, click "Run" and see the probability of the increase you are aiming for. Your estimation will be based on true values of stock price. Good luck! <br /> 

                        <div className="mc-result-highlight">
                        Being aware of these assumptions, and based on {numberOfSimulations.toLocaleString()} simulations and {historicalTime} days of historical data, the model estimates a {probabilityIncrease.toFixed(2)}% probability of a {increaseTest}% price increase over the next {futureTime} days.  
                        </div>
                    </div>
                </Box>
            </div>

            <div className="mc-section mc-row">
                <Box height={500} width={550}>
                    <div className="mc-component-title">
                        Historical Price (USD)
                    </div>
                    <div className="mc-component-body mc-line">
                    <MyLineChart 
                        data={lineChartData} 
                        enablePoints={false}
                        axisBottom={null}
                        />
                    </div>
                </Box>  
                <Box height={500} width={650}>
                    <div className="mc-component-title">
                        Histogram of Price Change
                    </div>
                    <div className="mc-component-body mc-hist">
                    <MyBarChart
                        data={barChartData}
                        keys={["frequency"]}
                        indexBy="bin"
                        axisBottomLegend="Daily Price Change Range"
                        axisLeft={{legend: "Frequency",
                            legendOffset: -40,
                        }}
                        axisLeftLegend="Frequency"
                        colors={{ scheme: "blues" }}
                        padding={0.2}
                        />
                    </div>
                </Box>
                </div>
        </div>
        </div>
    )
}

export default HistoricalChart;