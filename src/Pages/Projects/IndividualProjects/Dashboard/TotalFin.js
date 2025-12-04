import './Dashboard.css'
import { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import { formatTitleLabel, formatNumber } from './utils.js'

const TotalFin = ({ rawData, selectedCategory, selectedRegion, selectedIndicator, selectedPeriod }) => {

    const [totalFin, setTotalFin] = useState(0);
    const { formattedNumber, suffix } = formatNumber(totalFin);

    useEffect(() => {

        let filteredData = rawData;
        if (selectedCategory && selectedCategory !== 'All') {
            filteredData = filteredData.filter(item => item.category === selectedCategory)
        }
        if (selectedRegion && selectedRegion !== 'All') {
            filteredData = filteredData.filter(item => item.region === selectedRegion)
        }
        // Filter by month based on selectedPeriod
        if (selectedPeriod && selectedPeriod.length === 2) {
            const [startMonth, endMonth] = selectedPeriod;
            filteredData = filteredData.filter(item => {
                const month = Number(item.month);
                return month >= startMonth && month <= endMonth;
            });
        }

        const totalFinData = filteredData.reduce((sum, row) => sum + (Number(row[selectedIndicator]) || 0), 0);

        setTotalFin(totalFinData)

    }, [rawData, selectedCategory, selectedRegion, selectedIndicator, selectedPeriod])
    

    return (
        <div className=''>
            <Box width={280} height={280}>
                <div className='component-title'>
                    {formatTitleLabel(selectedIndicator)}                
                </div>
                <div className="main-number">
                    {formattedNumber}
                </div>
                    {suffix}
            </Box>
        </div>
    );
};

export default TotalFin; 