import React, { useState } from 'react';
import { Link } from "react-router-dom";

function BlogForm() {
    const [key, setKey] = useState(0)

    const [formData, setFormData] = useState({
        author: '',
        date: '',
        link: '',
        text: ''
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
        setKey(key++)
        console.log('Form Data Submitted:', formData);
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
                <label htmlFor="link">Song Link:</label>
                <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                />
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
