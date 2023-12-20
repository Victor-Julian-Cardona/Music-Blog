import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PostsContext from '../Context';
import { useFormData } from '../FormContext';

function BlogForm({ selectedPreviewUrl }) {
    const navigate = useNavigate();
    const posts = useContext(PostsContext);
    const { formData, setFormData } = useFormData();
    const [key, setKey] = useState(null);

    useEffect(() => {
        if (posts.length > 0) {
            const maxKey = Math.max(...posts.map(post => post.id));
            setKey(maxKey + 1);
        }
    }, [posts]);

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${month}-${day}-${year}`;
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            "link": selectedPreviewUrl
        }));
    }, [selectedPreviewUrl]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            ...formData,
            "link": formData.isLinkSelected ? formData.link : '' // Set link only if isLinkSelected is true
        };
    
        axios.post('http://localhost:5005/posts', postData)
            .then(response => {
                console.log('Data Posted:', response.data);
                navigate(`/post/${key}`);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    
        setKey(key + 1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Link to="/Search">
                    <button type="button">
                        Search for Song
                    </button>
                </Link>
            </div>

            <div>
                <label htmlFor="isLinkSelected">
                    Include Song Link:
                    <input
                        type="checkbox"
                        id="isLinkSelected"
                        name="isLinkSelected"
                        checked={formData.isLinkSelected}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="text">Text:</label>
                <textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default BlogForm;
