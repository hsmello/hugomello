import './Dashboard.css'
import React, { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import MyPieChart from '../../../../Components/PieChart.js';
import { formatTitleLabel, filterData } from './utils.js'

const PieChartRegion = ({ rawData, selectedCategory, selectedRegion, selectedIndicator, selectedPeriod  }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {

    if (!rawData || rawData.length === 0) return; // wait for data

    const filteredData = filterData(rawData, selectedCategory, selectedRegion, selectedPeriod);

    if (!filteredData || filteredData.length === 0) {
        setPieChartData([]); // handle empty
        return;
    }

    // Aggregate share_revenue by region
    const map = {};
    filteredData.forEach(row => {
        const code = selectedRegion === 'All' ? row.region : row.country;
        const value =  selectedRegion === 'All' ? parseFloat(row[selectedIndicator]) / 1000 || 0 : parseFloat(row[selectedIndicator]) || 0;
        if (map[code]) {
          map[code] += value; // sum for multiple rows
        } else {
          map[code] = value;
        }
      });

      // Convert to array of {id, value} for Nivo
    const formattedData = Object.keys(map).map(code => ({
        id: code,
        label: code,
        value: Math.round(map[code])
    }));

    setPieChartData(formattedData);
  }, [rawData, selectedCategory, selectedRegion, selectedIndicator, selectedPeriod])

  return (
    <div>
        <Box width={490} height={400}>
                <div className='component-title'>
                  {
                    selectedRegion === 'All' & selectedCategory === 'All'
                      ? `Total ${formatTitleLabel(selectedIndicator)} by region (Thousand CHF)`
                      : selectedRegion === 'All'
                        ? `${selectedCategory} ${formatTitleLabel(selectedIndicator)} by region (Thousand CHF)`
                        : selectedCategory === 'All'
                          ? `Total ${formatTitleLabel(selectedIndicator)} by country in ${selectedRegion} (CHF)`
                          : `${selectedCategory} ${formatTitleLabel(selectedIndicator)} by country in ${selectedRegion} (CHF)`
                  }
                </div> 
            <div className='component-cont'>
                <MyPieChart 
                    data={pieChartData}
                    />
            </div>
        </Box>
    </div>
  );
};

export default PieChartRegion;
