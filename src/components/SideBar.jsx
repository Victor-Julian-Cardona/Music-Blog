import axios from 'axios';
import { useContext } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PostsContext from '../Context';

function Sidebar() {
    const { posts } = useContext(PostsContext);
    const { refetchPosts } = useContext(PostsContext);
    const { id } = useParams();
    const mostRecentPostId = Math.max(...posts?.map(p => p.id));
    const isViewingMostRecentPost = id && parseInt(id, 10) === mostRecentPostId;
    const navigate = useNavigate();
    const useThisId = id? id:mostRecentPostId;
    const { pathname } = useLocation()

    let goingToForm
    if (pathname.includes('/create') || pathname.includes('/update')) {
        goingToForm = true
    }
    else {
        goingToForm = false
    }

    const handleDelete = (e) => {
        e.preventDefault();

        if (posts?.length !== 1) {
            axios.delete(`https://music-blog-mock-backend.adaptable.app/posts/${id}`)
                .then(() => {
                    console.log('Post deleted');
                    navigate(`/`);
                    refetchPosts()
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="sidebar">
            <Link id='item' to={`/create/${mostRecentPostId + 1}`} className="button-link">Create Post</Link>
            <Link id='item' to={`/update/${useThisId}`} className="button-link">Update Post</Link>

            {id && !isViewingMostRecentPost && !goingToForm && (
                <>
                    <button id='item' onClick={handleDelete}>Delete Post</button>
                </>
            )}
        </div>
    );
}

export default Sidebar;
