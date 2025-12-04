import './Dashboard.css'
import { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import StackedBar from '../../../../Components/StackedBar.js';
import { formatNumber, formatTitleLabel, filterData } from './utils.js'

const ProfitBar = ({ rawData, selectedCategory, selectedRegion, selectedPeriod }) => {

    const [profitBarData, setProfitBarData] = useState([]);
    const [income, setIncome] = useState([]);
    const [investment, setInvestment] = useState([]);

    const profit = income - investment;
        
    const { formattedNumber, suffix } = formatNumber(profit);

    useEffect(() => {
        if (!rawData || rawData.length === 0) return; 

        const filteredData = filterData(rawData, selectedCategory, selectedRegion, selectedPeriod);

        const map = {}
        filteredData.forEach(row => {
            const region = selectedRegion === 'All' ? "Worldwide" : selectedRegion;
            const income = parseFloat(row.share_revenue) || 0;
            const investment = parseFloat(row.investment) || 0

            if (!map[region]) {
                map[region] = { income: 0, investment: 0 };
            }
            map[region].income += income;
            map[region].investment += investment;
        })

        const formattedData = Object.keys(map).map(region => ({
            region,
            income: Math.round(map[region].income),
            investment: Math.round(map[region].investment)
        }))

        setProfitBarData(formattedData)
        setIncome(formattedData[0].income)
        setInvestment(formattedData[0].investment)
    }, [rawData, selectedCategory, selectedRegion, selectedPeriod])

    return (
        <div>
            <Box width={280} height={400}>
                <div style={{ width: '100%', height: '100%' }}>
                <div className='component-title'>
                    Profit Analysis
                </div>
                <div className='component-cont'>
                    {
                        selectedRegion === 'All' & selectedCategory === 'All'
                            ? `Total profit`
                            : selectedRegion === 'All'
                                ? `Total ${formatTitleLabel(selectedCategory)}`
                                : selectedCategory === 'All'
                                    ? `Total ${selectedRegion}`
                                    : `${selectedCategory} in ${selectedRegion}`
                    } 
                    <div>
                        {formattedNumber} 
                    </div>
                    <div>
                        {suffix}
                    </div>    

                    <div className='stacked-chart-display'>
                        <StackedBar
                            data={profitBarData}
                            keys={['income', 'investment']}
                            indexBy="region"
                            colors={['#619E5F', '#A63446']} // green for income, red for cost
                            height={300}
                            padding={0}
                        />
                    </div>
                </div>
                </div>
            </Box>
        </div>
    );
};

export default ProfitBar;


