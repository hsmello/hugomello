import './Dashboard.css'
import { useEffect, useState } from 'react';

import Box from '../../../../Components/Box.js';
import InfoTooltip from '../../../../Components/InfoTooltip.js';
import Dropdown from '../../../../Components/Dropdown.js';
import RadioGroup from '../../../../Components/RadioGroup.js';
import RangeSlider from '../../../../Components/RangeSlider.js';
import Loading from '../../../../Components/Loading.js';
import BasicAlerts from '../../../../Components/Alert.js';

import BillingSuccess from './BillingSuccess.js';
import TotalFin from './TotalFin.js';
import LineChartTime from './MyLineChart.js';
import ProfitBar from './ProfitBar.js';
import DashboardMap from './DashboardMap.js';
import PieChartRegion from './PieChartRegion.js';
import { getFinancialData } from '../../../../utils/dataService.js';

const Dashboard = () => {

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const [triggerAlert, setTriggerAlert] = useState(null);
    const [rawData, setRawData] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [selectedFinanceIndicator, setSelectedFinanceIndicator] = useState('investment');
    const [monthRange, setMonthRange] = useState([1, 8]);
    const radioGroupOptions = [
        { label: 'Revenue', value: 'revenue' },
        { label: 'Revenue Share', value: 'share_revenue' },
        { label: 'Investment', value: 'investment' },
        { label: 'Profit', value: 'profit' },
    ];
    const sliderMkars = [{value: 1, label: 'Jan',}, {value: 2, label: 'Feb',},
                         {value: 3, label: 'Mar',}, {value: 4, label: 'Apr',},
                         {value: 5, label: 'May',}, {value: 6, label: 'Jun',},
                         {value: 7, label: 'Jul',}, {value: 8, label: 'Aug',}];

    const handleSelectCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleSelectRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    // Get the raw data to pass to the components
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFinancialData()
            setRawData(data);
        }
        fetchData()
    }, []);

    if (!rawData) return <div className='loading'><Loading /> <br /> Loading</div>;

    const uniqueCategories = Array.from(new Set(rawData.map(item => item.category)));
    const categoryOptions = [{ value: 'All', label: 'All' }, ...uniqueCategories.map(cat => ({
        value: cat,
        label: cat
    }))];

    const uniqueRegions = Array.from(new Set(rawData.map(item => item.region)));
    const regionOptions = [{ value: 'All', label: 'All' }, ...uniqueRegions.map(reg => ({
        value: reg,
        label: reg
    }))];

    return (
        <div className="media-dashboard">
        {triggerAlert && (
            <BasicAlerts label={triggerAlert.label} type={triggerAlert.type} />
        )}
        <div className='dashboard-main' >
            <div className='dashboard-introduction'>
                <Box width={1200} height={250} bgColor={'#141a28'}>
                    <div className='individual-project-title'>
                    Responsive Web-based Dashboard
                    </div>
                    <div className='introduction-text'>
                    This dashboard demonstrates a data-driven approach to understanding business performance. By analyzing revenue, revenue share, investment levels, and profit across both project categories and regions, the tool helps surface trends that guide strategic planning. Whether the goal is to prioritize high-margin segments, evaluate regional performance, or assess the return on allocated resources, the dashboard supports informed and evidence-based decision making.
                    <br /> <br />
                    It consolidates key financial metrics and breaks them down by project category and region to reveal performance patterns and actionable insights. The dashboard is built to address core business questions, including: <strong><span style={{ fontStyle: 'italic' }}>Which categories deliver the highest ROI? Where should investments be increased or scaled back? How does performance vary across markets? </span></strong> The goal is to empower stakeholders with clarity and strategic direction.
                    </div>
                </Box> 
            </div>
            <div className='dashboard-section charts-row'>
                <Box width={600} height={280} >
                    <div className='control-title'>
                        Control Panel
                        <InfoTooltip text={"The Control Panel gives instructions to the different components of the dashboard. In this context, Revenue is the project total revenue, while Revenue Share, Investment, and Profit are related only to the company of interest."} />
                    </div>
                    <div className="control-panel-content">
                        <div className="dropdown-column">
                            <Dropdown
                                label="Project Category"
                                options={categoryOptions}
                                value={selectedCategory}
                                onChange={handleSelectCategoryChange}
                                />
                            <Dropdown
                                label="Region"
                                options={regionOptions}
                                value={selectedRegion}
                                onChange={handleSelectRegionChange}
                            />
                            <div className='time-slider'>
                                <RangeSlider
                                    value={monthRange}
                                    min={1}
                                    max={8}
                                    step={1}
                                    onChange={setMonthRange}
                                    width={200}
                                    valueLabelFormat={(v) => monthLabels[v-1]}
                                    marks={sliderMkars}
                                />
                            </div>
                        </div>
                        <div className="radio-column">
                            <RadioGroup 
                                label={"Finance Indicator"}
                                options={radioGroupOptions}
                                value={selectedFinanceIndicator}
                                onChange={(e) => {
                                    console.log(e)
                                    setSelectedFinanceIndicator(e)
                                }}
                                />
                        </div>
                    </div>
                </Box>
                <BillingSuccess 
                    rawData={rawData}
                    selectedCategory={selectedCategory}          
                    selectedRegion={selectedRegion}  
                    selectedPeriod={monthRange} 
                />
                
                <TotalFin 
                    rawData={rawData}
                    selectedCategory={selectedCategory}          
                    selectedRegion={selectedRegion}  
                    selectedIndicator={selectedFinanceIndicator} 
                    selectedPeriod={monthRange}
                />
                
            </div>
            
            <div className="dashboard-section charts-row">
                <ProfitBar
                    rawData={rawData} 
                    selectedCategory={selectedCategory}          
                    selectedRegion={selectedRegion} 
                    selectedIndicator={selectedFinanceIndicator} 
                    selectedPeriod={monthRange}
                />
                <LineChartTime 
                    rawData={rawData} 
                    selectedCategory={selectedCategory}          
                    selectedRegion={selectedRegion} 
                    selectedIndicator={selectedFinanceIndicator} 
                    selectedPeriod={monthRange}
                />
                
            </div>
            <div className="dashboard-section charts-row">
                <PieChartRegion 
                    rawData={rawData} 
                    selectedCategory={selectedCategory}
                    selectedRegion={selectedRegion} 
                    selectedIndicator={selectedFinanceIndicator}
                    selectedPeriod={monthRange} 
                />
                <DashboardMap 
                    rawData={rawData} 
                    selectedCategory={selectedCategory}
                    selectedIndicator={selectedFinanceIndicator} 
                    selectedPeriod={monthRange}
                />
            </div>

        </div>
        <div className="mc-mobile-warning">
                <strong>Notice:</strong> This project is not adapted for mobile devices.<br />
                Please view on a desktop for the best experience. 
                <br />
                Thank you for your understanding!
            </div>
        </div>
    );
};

export default Dashboard;
