import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostsContext from '../Context';

function Home() {
    const posts = useContext(PostsContext);
    
    const mostRecentPost = posts.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current;
    });

return (
    <div>
        <h1>Home</h1>
        <Link to={`/post/${mostRecentPost.id}`}>Read our latest post: {mostRecentPost.title}</Link>
    </div>
);
}

export default Home;
