import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogPostsContext from '../Context';


function Navbar() {
    const posts = useContext(BlogPostsContext);
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
                <li onClick={toggleDropdown} onMouseLeave={toggleDropdown}>
                    BlogPosts
                    {dropdownOpen && (
                        posts.map(post => (
                            <div key={post.id}>
                                <h3>{post.title}</h3>
                            </div>
                            ))
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
