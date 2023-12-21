import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostsContext from '../Context';

function Sidebar() {
    const { posts } = useContext(PostsContext);
    const { id } = useParams();
    const mostRecentPostId = Math.max(...posts?.map(p => p.id));
    const isViewingMostRecentPost = id && parseInt(id, 10) === mostRecentPostId;
    const navigate = useNavigate();  // Use the useNavigate hook here

    const handleDelete = (e) => {
        e.preventDefault();

        if (posts?.length !== 1) {
            axios.delete(`https://music-blog-mock-backend.adaptable.app/posts/${id}`)
                .then(() => {
                    console.log('Post deleted');
                    navigate(`/`);  // Navigate to the homepage after deletion
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="sidebar">
            <Link id='item' to={`/create/${mostRecentPostId + 1}`} className="button-link">Create Post</Link>

            {id && !isViewingMostRecentPost && (
                <>
                    <Link id='item' to={`/update/${id}`} className="button-link">Update Post</Link>
                    <button id='item' onClick={handleDelete}>Delete Post</button>
                </>
            )}
        </div>
    );
}

export default Sidebar;
