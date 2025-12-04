import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import './NavBar.css'

function NavBar() {

    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }

    return (
        <header>
            <button className='nav-btn nav-open-btn' onClick={showNavBar}>
                <FaBars />
            </button>
            <nav ref={navRef}>
                <a href="/home">Home</a>
                <a href="/projects">Projets</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>
        </header>
    );
}

export default NavBar;

