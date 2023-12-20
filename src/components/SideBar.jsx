import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Sidebar() {
    const { postId } = useParams();

    const handleDelete = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:5005/projects/${postId}`)
        .catch(err => console.error(err));

        console.log('post deleted');
    };

    return (
        <div className="sidebar">
            <Link to="/create" className="button-link">Create Post</Link>
            <Link to={`/update/${postId}`} className="button-link">Update Post</Link>
            <button onClick={handleDelete}>Delete Post</button>
        </div>
    );
}

export default Sidebar;

