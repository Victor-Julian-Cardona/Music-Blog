import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useParams } from 'react-router-dom';
import PostsContext from '../Context';

function BlogPost({ post }) {
    const {posts} = useContext(PostsContext);
    const [currentPost, setCurrentPost] = useState(null);
    const { id } = useParams();

    console.log(posts)

    useEffect(() => {
        if (post) {
            setCurrentPost(post)
        }
    }, [post])

    useEffect(() => {

        if (!post && id) {
            const foundPost = posts.find(p => p.id === parseInt(id, 10));
            setCurrentPost(foundPost);
        }
    }, [id, post, posts]);

    useEffect(() => {
        if (currentPost) {
            axios.get(`https://music-blog-mock-backend.adaptable.app/comments?postId=${currentPost.id}`)
                .then(response => {
                    setComments(response.data);
                })
                .catch(err => console.error(err));
        }
    }, [currentPost, post]);

    const [comments, setComments] = useState([]);

    if (!currentPost) {
        return <div>Loading post or post not found...</div>;
    }

    console.log("This is the preview URL", currentPost.link.preview_url)
    console.log("this is the object", currentPost)
    return (
        <div className="blog-post">
            <div>
                <h2>{currentPost.title}</h2>
                <p className="author">By {currentPost.author}</p>
                <p className="date">Published on: {new Date(currentPost.date).toLocaleDateString()}</p>
                <p className='postText'>{currentPost.text}</p>
                {currentPost.link && currentPost.link.artists && currentPost.link.artists.length > 0 && currentPost.link.album && currentPost.link.album.images && currentPost.link.album.images.length > 0 && (
                    <div className= "searchResults">
                    {currentPost.link.preview_url &&
                        (<ReactAudioPlayer key={currentPost.id}
                            src= {currentPost.link.preview_url}
                            controls
                        />)}
                        <h3>{currentPost.link.name}</h3>
                        <h3>By: {currentPost.link.artists[0].name}</h3>
                        <h3> Album: {currentPost.link.album.name}</h3>
                        <img src = {currentPost.link.album.images[0].url} width={100} height={100} />
                    </div>
                )}
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
