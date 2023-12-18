import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/next">Next</Link></li>
                <li><Link to="/previous">Previous</Link></li>
                <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    BlogPosts
                    {dropdownOpen && (
                        <ul style={{ position: 'absolute', backgroundColor: 'white', listStyleType: 'none', padding: '10px' }}>
                            {/* useEffect with all blogposts */}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
