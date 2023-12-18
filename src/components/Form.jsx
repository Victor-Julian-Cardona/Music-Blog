import React, { useState } from 'react';

function BlogForm() {
    const [formData, setFormData] = useState({
        author: '',
        date: '',
        songLink: '',
        text: ''
    });

    const [key, setKey] = useState(0)


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
                <label>Spotify Search Bar:</label>
                {/* Spotify Search Bar */}
                <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                    Spotify Search Bar will go here
                </div>
            </div>

            <div>
                <label htmlFor="songLink">Song Link:</label>
                <input
                type="text"
                id="songLink"
                name="songLink"
                value={formData.songLink}
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
