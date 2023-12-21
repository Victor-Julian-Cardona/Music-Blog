import React, { useContext, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import PostsContext from '../Context';

function Navbar() {
    const { pathname } = useLocation()

    console.log("Pathname", pathname)

    let id

    let params
    if (pathname.includes('/post')) {
        params = matchPath({ path:"/post/:id" }, pathname)
        id = params.params.id
    }

    // const params = matchPath(pathname, { path:"/posts/:id" })
    console.log("These are params", params)
    const { posts } = useContext(PostsContext);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // console.log("ID from params", id, useParams())

    const getPrevAndNext = (activeID) => {
        console.log("Active Id", activeID)
        const sortedPosts = [...posts].sort((a, b) => a.id - b.id);
        const index = sortedPosts.findIndex(post => post.id === activeID);
        console.log("Index", index)
        const prevPost = index > 0 ? sortedPosts[index - 1] : null;
        const nextPost = index >= 0 && index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null;

            return { prevPost, nextPost };
        
    };

    const currentPostId = id ? parseInt(id, 10) : Math.max(...posts.map(p => p.id));
    console.log("Current ID", currentPostId)
    const { prevPost, nextPost } = getPrevAndNext(currentPostId);

    console.log("IDs", prevPost, nextPost)
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
                <li id = "dropDown" onClick={toggleDropdown}>
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
