import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const PostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
    console.log("Invoking Blog context")
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get('https://music-blog-mock-backend.adaptable.app/posts')
            .then(response => {
                console.log("Line 12 Context Posts ===>", response)
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const refetchPosts = () => {
        fetchPosts();
    };

    return (
        <PostsContext.Provider value={{ posts, setPosts, refetchPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;