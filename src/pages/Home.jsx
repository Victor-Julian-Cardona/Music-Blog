import React, { useContext, useEffect, useState } from 'react';
import PostsContext from '../Context';
import BlogPost from '../components/BlogPost';
import Sidebar from '../components/SideBar';

function Home() {
    const { posts } = useContext(PostsContext);
    console.log("Line 9 Posts ===>", posts)

    const [mostRecentPost, setMostRecentPost] = useState(null)
    
    
    useEffect(() => {
        
        if (posts.length > 0) {
            let getMostRecentPost = posts.reduce((latest, post) => {
                return (latest.id > post.id) ? latest : post;
            }, posts[0] || {});
            setMostRecentPost(getMostRecentPost)
            console.log("Recent", mostRecentPost)
        }

    }, [posts])

return (
    <div>
        <Sidebar />
        <BlogPost post={mostRecentPost} />
    </div>
);
}

export default Home;
