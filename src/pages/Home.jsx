import React, { useContext } from 'react';
import PostsContext from '../Context';
import BlogPost from '../components/BlogPost';

function Home() {
    const posts = useContext(PostsContext);
    console.log(posts)
    
    const mostRecentPost = posts.reduce((latest, post) => {
        return (latest.id > post.id) ? latest : post;
    }, posts[0] || {});

return (
    <div>
        <h1>Home</h1>
        <BlogPost post = {mostRecentPost} />
    </div>
);
}

export default Home;
