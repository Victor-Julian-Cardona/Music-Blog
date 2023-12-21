import axios from 'axios';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostsContext from '../Context';

function Sidebar() {
    const {posts} = useContext(PostsContext);
    const { id } = useParams();
    const mostRecentPostId = Math.max(...posts?.map(p => p.id));
    const isViewingMostRecentPost = id && parseInt(id, 10) === mostRecentPostId;

    console.log(id)

    const handleDelete = (e) => {
        e.preventDefault();

        if (posts?.length != 1) {
            axios.delete(`https://music-blog-mock-backend.adaptable.app/posts/${currentPostId}`)
            .catch(err => console.error(err));
            console.log('post deleted');
        }

    };

    return (

        <div className="sidebar">
            <Link to={`/create/${mostRecentPostId + 1}`} className="button-link">Create Post</Link>
            
            {id && !isViewingMostRecentPost && (
                <>
                    <Link to={`/update/${id}`} className="button-link">Update Post</Link>
                    <button onClick={handleDelete}>Delete Post</button>
                </>
            )}
        </div>
    );
}

export default Sidebar;

