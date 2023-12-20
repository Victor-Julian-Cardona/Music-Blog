import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsContext from '../Context';

function BlogPost({ post }) {
    const posts = useContext(PostsContext);
    const [currentPost, setCurrentPost] = useState(post);
    const { id } = useParams();

    console.log(posts)

    useEffect(() => {

        if (!post && id) {
            const foundPost = posts.find(p => p.id === parseInt(id, 10));
            setCurrentPost(foundPost);
        }
    }, [id, post, posts]);

    useEffect(() => {
        if (currentPost) {
            axios.get(`http://localhost:5005/comments?postId=${currentPost.id}`)
                .then(response => {
                    setComments(response.data);
                })
                .catch(err => console.error(err));
        }
    }, [currentPost]);

    const [comments, setComments] = useState([]);

    if (!currentPost) {
        return <div>Loading post or post not found...</div>;
    }

    return (
        <div className="blog-post">
            <div>
                <h2>{currentPost.title}</h2>
                <p className="author">By {currentPost.author}</p>
                <p className="date">Published on: {new Date(currentPost.date).toLocaleDateString()}</p>
                <p className='postText'>{currentPost.text}</p>
            </div>

            <div>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>Author: {comment.author}</p>
                        <p>{comment.description}</p>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default BlogPost;
