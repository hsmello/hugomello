import './Dashboard.css'
import React, { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import MyChoropleth from '../../../../Components/Choropleth.js';
import { formatTitleLabel, filterData } from './utils.js'

const DashboardMap = ({ rawData, selectedCategory, selectedIndicator, selectedPeriod }) => {
  const [choroplethData, setChoroplethData] = useState([]);
  const [domain, setDomain] = useState([0, 1]); 

  useEffect(() => {
    if (!rawData || rawData.length === 0) return; // wait for data

    const filteredData = filterData(rawData, selectedCategory, "All", selectedPeriod);

    if (!filteredData || filteredData.length === 0) {
        setChoroplethData([]); // handle empty category
        return;
    }

    // Aggregate share_revenue by country code
      const map = {};
      filteredData.forEach(row => {
        const code = row['country code'];
        const value = parseFloat(row[selectedIndicator]) || 0;
        if (map[code]) {
          map[code] += value; // sum for multiple rows
        } else {
          map[code] = value;
        }
    });

    // Convert to array of {id, value} for Nivo
    const formattedData = Object.keys(map).map(code => ({
        id: code,
        value: map[code]
    }));

    setChoroplethData(formattedData);

    // Compute min and max for the domain
    const values = formattedData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    setDomain([min, max]);

    
  }, [rawData, selectedCategory, selectedIndicator,selectedPeriod]);

  return (
    <div>
        <Box width={690} height={400}>
                <div className='component-title'>
                  {
                    selectedCategory === 'All' ? 
                    `${formatTitleLabel(selectedIndicator)} Worldwide` :
                    `${formatTitleLabel(selectedIndicator)} of ${formatTitleLabel(selectedCategory)} Worldwide`
                  }
                </div> 
            <div className='component-cont'>
                <MyChoropleth 
                    data={choroplethData} 
                    domain={domain}
                    />
            </div>
        </Box>
        
    </div>
  );
};

export default DashboardMap;
