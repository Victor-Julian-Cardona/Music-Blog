import axios from 'axios';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostsContext from '../Context';

function Sidebar() {
    const posts = useContext(PostsContext);
    const { id } = useParams();
    const currentPostId = id ? parseInt(id, 10) : Math.max(...posts.map(p => p.id));
    console.log(currentPostId)


    const handleDelete = (e) => {
        e.preventDefault();

        if (posts.length != 1) {
            axios.delete(`http://localhost:5005/posts/${currentPostId}`)
            .catch(err => console.error(err));
            console.log('post not deleted');
        }

    };

    return (
        <div className="sidebar">
            <Link to="/create" className="button-link">Create Post</Link>
            <Link to={`/update/${currentPostId}`} className="button-link">Update Post</Link>
            <button onClick={handleDelete}>Delete Post</button>
        </div>
    );
}

export default Sidebar;

