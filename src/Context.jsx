import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const PostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5005/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;