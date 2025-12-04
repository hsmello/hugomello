import './Dashboard.css'
import React, { useEffect, useState } from 'react';

import InfoTooltip from '../../../../Components/InfoTooltip.js';
import Box from '../../../../Components/Box.js';
import { formatTitleLabel, filterData } from './utils.js'

const BillingSuccess = ({ rawData, selectedCategory, selectedRegion, selectedPeriod }) => {

    const [regCatBillingShare, setRegCatBillingShare] = useState(0);
    const [regBillingShare, setRegBillingShare] = useState(0);
    const [catBillingShare, setCatBillingShare] = useState(0);
    
    const billingLabel = () => {
        if (selectedRegion === 'All' && selectedCategory === 'All') return '';
        if (selectedRegion === 'All') return `for ${formatTitleLabel(selectedCategory)} Worldwide`;
        if (selectedCategory === 'All') return `in ${formatTitleLabel(selectedRegion)}`;
        return `for ${formatTitleLabel(selectedCategory)} in ${formatTitleLabel(selectedRegion)}`;
    };

    const billingComparisonLabel = () => {
        if (selectedRegion === 'All' && selectedCategory === 'All') return '';
        if (selectedRegion === 'All') {
            return (`All Categories Worldwide: ${(catBillingShare * 100).toFixed(2)}%`);
        }
        if (selectedCategory === 'All') {
            return (`All Categories in ${formatTitleLabel(selectedRegion)}: ${(regBillingShare * 100).toFixed(2)}%`);
        }
        return (`All Categories in ${selectedRegion}: ${(regBillingShare * 100).toFixed(2)}%`);
    };

    useEffect(() => {
        if(!rawData || rawData.length === 0) return;

        const filteredDataRegionCategory = filterData(rawData, selectedCategory, selectedRegion, selectedPeriod);
        const filteredDataRegion = filterData(rawData, 'All', selectedRegion, selectedPeriod);
        const filteredDataCat = filterData(rawData, selectedCategory, 'All', selectedPeriod);

        if (!filteredDataRegionCategory || filteredDataRegionCategory.length === 0) {
            setRegCatBillingShare(0);
            setRegBillingShare(0);
            return;
        }

        /**** 1) Billing Success share for Region-Category pair ****/

        const totalBilling = filteredDataRegionCategory.reduce((sum, row) => sum + (Number(row.billing) || 0), 0);
        const totalBillingSuccess = filteredDataRegionCategory.reduce((sum, row) => sum + (Number(row.billing_success) || 0), 0);

        setRegCatBillingShare(totalBillingSuccess / totalBilling)

        /**** 2) Billing Success share for Region (all categories) ****/

        const totalRegionBilling = filteredDataRegion.reduce((sum, row) => sum + (Number(row.billing) || 0), 0);
        const totalRegionSuccess = filteredDataRegion.reduce((sum, row) => sum + (Number(row.billing_success) || 0), 0);

        setRegBillingShare(totalRegionSuccess / totalRegionBilling)

        /**** 3) Billing Success share for Category (all regions) ****/

        const totalCatBilling = filteredDataCat.reduce((sum, row) => sum + (Number(row.billing) || 0), 0);
        const totalCatSuccess = filteredDataCat.reduce((sum, row) => sum + (Number(row.billing_success) || 0), 0);

        setCatBillingShare(totalCatSuccess / totalCatBilling)

    }, [rawData, selectedCategory, selectedRegion, selectedPeriod])

    return (
        <div>
            <Box width={280} height={280}>
                <div className='component-title'>
                    Billing Success
                    <InfoTooltip text={'There are billing attempts as per agreed with user. However, some billings attempts are not successful. A low share of sucess might indicate need to discuss strategies with partners in the region.'}/>
                </div>
                <div className="main-number">
                    {(regCatBillingShare * 100).toFixed(2)}%
                </div>
                < div className='main-number-label'>
                    {billingLabel()}
                </div>
                <div className="number-comparison">
                    {billingComparisonLabel()}
                </div>
              
            </Box>
        </div>
    );
};

export default BillingSuccess;