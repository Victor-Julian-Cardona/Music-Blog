import React, { useContext } from 'react';
import PostsContext from '../Context';

function BlogPost() {
    const posts = useContext(PostsContext);
    const id  = useParams();
    const post = posts.find(p => p.id === parseInt(id));

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5005/comments')
        .then(response => {
            setComments(response.data.filter(comment =>
                comment.postId == post.id));
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="blog-post">

            <div>
                <h2>{post.title}</h2>
                <p className="author">By {post.author}</p>
                <p className="date">Published on: {new Date(post.date).toLocaleDateString()}</p>
                <p className='postText'>{post.text}</p>
            </div>

            <div>
                {comments.map(comment =>
                    <li key={comment.id}>
                            <p>Author: {comment.author}</p>
                            <p>{comment.description}</p>
                    </li>
                )}

            </div>

        </div>

    )
}

export default BlogPost;
