import React, { useState } from 'react';
import './Home.css';
import { ReactTyped } from "react-typed";
import { IoLocationOutline } from "react-icons/io5";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Home() {
    const [showSecond, setShowSecond] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const firstText = "Hello, I'm";
    const typeSpeed = 100;
    return (
        <div className="home-container">
            <div className="intro-text">
                <h1>
                    <ReactTyped
                        strings={[firstText]}
                        typeSpeed={typeSpeed}
                        showCursor={false}
                        onComplete={() => setShowSecond(true)}
                    />
                    {" "}
                    <span className="bold">
                    {showSecond && (
                        <ReactTyped
                            strings={["Hugo."]}
                            typeSpeed={typeSpeed}
                            showCursor={false}
                            loop={false}
                            onComplete={() => setShowAll(true)}
                        />
                        )}
                        </span>
                </h1>
                {showAll && (
                    <div className="fade-in">
                        <div className='home-location'>
                            <IoLocationOutline /> Geneva, Switzerland
                        </div>
                        {/*<p>I'm currently at the International Trade Centre, where I listen to stories data tell</p>*/}
                        <p>I'm currently at the International Trade Centre, <br />where I give voice to the stories data tell about global trade</p>
                        <div className='home-contact'>

                            <a 
                            href="https://www.linkedin.com/in/hsmello/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                            >
                                <FaLinkedin />
                            </a>

                           <a 
                            href="https://github.com/hsmello" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                            >
                                <FaGithub />
                            </a>

                            <a 
                                href="mailto:hsmello6@gmail.com"
                                style={{ color: "inherit", textDecoration: "none" }}>
                                <MdEmail />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Home;
