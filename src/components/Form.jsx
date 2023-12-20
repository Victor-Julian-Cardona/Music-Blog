import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function BlogForm({ selectedPreviewUrl }) {

    const navigate = useNavigate();

    const previewUrl = selectedPreviewUrl;

    const [key, setKey] = useState(10)

    const [formData, setFormData] = useState({
        "id": key,
        "title":'',
        "author": '',
        "date": '',
        "link": '',
        "text": '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            ...formData,
            "link": selectedPreviewUrl
        };
        console.log(postData)
    
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
                <label htmlFor="date">Date:</label>
                <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
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
            <label>
            Song Preview URL:
            <input
                type="text"
                value={previewUrl}
                readOnly
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
