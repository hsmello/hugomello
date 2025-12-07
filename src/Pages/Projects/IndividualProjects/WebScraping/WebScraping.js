import './WebScraping.css';
import CodeWindow from './CodeWindow.js';
import WsCode from './code.js';

const WebScrapping = () => {

    return (
        <div className='wb-container'>
            <div className='individual-project-title'>
                Web Scraping
            </div>
            <div className='wb-body'>
                <div className='wb-issue'>
                    <div className='wb-issue-title'>
                        The issue
                    </div>
                    <div className='wb-issue-body'>
                        <ul class="custom-bullets">
                            <li>Links from stock exchanges on the institution's website eventually became invalid.</li>
                        </ul>
                    </div>
                    <div className='wb-issue-desc'>
                        To address this issue, in previous years, someone had to manually check hundreds of links across dozens of pages periodically—one by one. When I learned about this, I offered to automate the process. These links are sustainable reports from each stock exchange that are part of the institution, and they can be found here: <a href="https://sseinitiative.org/exchanges-filter-search" target="_blank"  rel="noopener noreferrer" style={{ color: 'var(--linkColor)', textDecoration: 'underline' }}> UN Sustainable Stock Exchange Database</a>.
                        <br />
                        I created a web scraping script that identifies links returning unsuccessful HTTP codes. I then packaged this script into a standalone .exe file, allowing users to run it with a double click, without needing any coding knowledge, and automatically generate an Excel file listing all broken links. This is one of the very few examples I can make public. You can see the web scraping example below.
                    </div>
                    < div className='wb-issue-code'>
                        <CodeWindow codeString={WsCode} fileName="Sustainable Stock Exchange Web Scraping.py" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WebScrapping;