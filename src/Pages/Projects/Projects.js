import './Projects.css'

import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card'

import RawDataImage from '../../SupportFiles/raw_data.jpg'
import DashboardImage from '../../SupportFiles/dashboard.jpg'


function Projects() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='projects-title'>
            Projects
            </div>
            <div className="projects-cards-container">

            <Card 
                title={'Web Scraping'}
                bodyText={'Click-to-run tool that detects broken website links and outputs a ready-to-use Excel report.'}
                onLearnMoreClick={() => navigate('/projects/web-scraping')}
                image={DashboardImage}
            />

            <Card 
                title={'Monte Carlo Simulation'}
                bodyText={'Leveraging API to have an up-to-date Monte Carlo estimation'}
                onLearnMoreClick={() => navigate('/projects/monte-carlo-simulation')}
                image={RawDataImage}
            />

            <Card 
                title={'Dashboard'}
                bodyText={'Example of a business friendly responsive web-based dashboard.'}
                onLearnMoreClick={() => navigate('/projects/dashboard')}
                image={DashboardImage}
            />

            </div>
        </div>
    );
}

export default Projects;