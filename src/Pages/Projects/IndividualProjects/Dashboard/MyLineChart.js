import './Dashboard.css'
import { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import MyLineChart from '../../../../Components/LineChart.js';
import { formatTitleLabel, filterData } from './utils.js'

const LineChartTime = ({ rawData, selectedCategory, selectedRegion, selectedIndicator }) => {

    const [lineChartData, setLineChartData] = useState([]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        if (!rawData || rawData.length === 0) return;

        const filteredData = filterData(rawData, selectedCategory, selectedRegion);

        // Aggregate the figure
        const map = {};
        filteredData.forEach(row => {
            const code = selectedRegion === 'All' ? row.region : row.country;
            const month = monthNames[(row.month || 0) - 1];
            const value = parseFloat(row[selectedIndicator]) || 0;
            if (!map[code]) map[code] = {};              // Initialize region/country
            if (!map[code][month]) map[code][month] = 0; // Initialize month
            map[code][month] += value;                   // Sum values
        })

        // create the array for Nivo
        const formattedData = Object.entries(map).map(([code, monthData]) => ({
            id: code,
            data: Object.entries(monthData)
                .sort(([monthA], [monthB]) => monthNames.indexOf(monthA) - monthNames.indexOf(monthB))
                .map(([month, total]) => ({
                x: month,
                y: Math.round(total)
            }))
        }))
            
        setLineChartData(formattedData);
        
    }, [rawData, selectedCategory, selectedRegion, selectedIndicator])

    return (
        <div>
            <Box width={900} height={400} >
                <div className='component-title'>
                    {
                        selectedRegion === 'All' & selectedCategory === 'All'
                            ? `Total ${formatTitleLabel(selectedIndicator)} by region (CHF)`
                            : selectedRegion === 'All'
                                ? `${formatTitleLabel(selectedCategory)} ${formatTitleLabel(selectedIndicator)} by region (CHF)`
                                : selectedCategory === 'All'
                                    ? `Total ${formatTitleLabel(selectedIndicator)} by country in ${selectedRegion} (CHF)`
                                    : `${selectedCategory} ${formatTitleLabel(selectedIndicator)} by country in ${selectedRegion} (CHF)`
                    }
                </div> 
                <div className='component-cont'>
                    <MyLineChart 
                        data={lineChartData}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                translateX: 100,
                                itemWidth: 80,
                                itemHeight: 22,
                                symbolShape: 'circle',
                                itemTextColor: 'var(--textColor)', 
                            }
                        ]} 
                    />
                </div> 
            </Box>
        </div>
    );
};

export default LineChartTime;



