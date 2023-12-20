import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostsContext from '../Context';

function Navbar() {
    const posts = useContext(PostsContext);
    const { id } = useParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getPrevAndNext = (activeID) => {
        const sortedPosts = [...posts].sort((a, b) => a.id - b.id);
        const index = sortedPosts.findIndex(post => post.id === activeID);
        const prevPost = index > 0 ? sortedPosts[index - 1] : null;
        const nextPost = index >= 0 && index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null;
        return { prevPost, nextPost };
    };

    const currentPostId = id ? parseInt(id, 10) : Math.max(...posts.map(p => p.id));
    const { prevPost, nextPost } = getPrevAndNext(currentPostId);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {prevPost && <li><Link to={`/post/${prevPost.id}`}>Previous</Link></li>}
                {nextPost && <li><Link to={`/post/${nextPost.id}`}>Next</Link></li>}
                <li onClick={toggleDropdown}>
                    BlogPosts
                    {dropdownOpen && (
                        posts.map(post => (
                            <div key={post.id}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </div>
                        ))
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
