import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import PostsContext from '../Context';
import { useFormData } from '../FormContext';

const initialFormData = {
    title: '',
    author: '',
    text: '',
    link: '',
    isLinkSelected: false,
    date: ''
};


function BlogForm({ selectedPreviewUrl }) {
    const navigate = useNavigate();
    const { posts, setPosts }= useContext(PostsContext);
    const { formData, setFormData } = useFormData();
    const [key, setKey] = useState(null);
    const { id } = useParams();
    console.log(id)

    const resetForm = () => {
        setFormData(initialFormData);
    };

    console.log(selectedPreviewUrl)


    useEffect(() => {
        if (id != key) {
            const postToUpdate = posts.find(post => post.id.toString() === id);
            if (postToUpdate) {
                setFormData({
                    title: postToUpdate.title || '',
                    author: postToUpdate.author || '',
                    text: postToUpdate.text || '',
                    link: postToUpdate.link || '',
                    isLinkSelected: true,
                    date: postToUpdate.date || getFormattedDate(),
                });
            }
        }
        else {
            resetForm();
        }
    }, [id]);

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
            "link": selectedPreviewUrl,
            "date": getFormattedDate(),
            "isLinkSelected": !!selectedPreviewUrl
        }));
    }, [selectedPreviewUrl, setFormData]);
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postTitle = formData.title.trim() ? formData.title : "No title"
        const postText = formData.author.trim() ? formData.author : "No author"

        const postData = {
            ...formData,
            title: postTitle,
            author: postText,
            "link": formData.isLinkSelected ? formData.link : ''
        };

        if (id != key) {

            axios.put(`https://music-blog-mock-backend.adaptable.app/posts/${id}`, {
                ...formData,
                id: id,
                "link": formData.isLinkSelected ? formData.link : ''
            })
                .then(response => {
                    console.log('Post Updated:', response.data);
                    let newPosts = [...posts]
                    let thisIndex
                    let thisPost = newPosts.find((post, i) => {
                        thisIndex = i
                        return post.id === response.data.id
                    })
                    thisPost = response.data
                    newPosts[thisIndex] = thisPost
                    setPosts(newPosts)
                    resetForm();
                    return true
                })
                .then(() => {
                    navigate(`/post/${id}`);
                })
                .catch(error => {
                    console.error('Error updating post:', error);
                });
        } else {
    
        axios.post('https://music-blog-mock-backend.adaptable.app/posts', postData)
            .then(response => {
                console.log('Data Posted:', response.data);
                let newPosts = [...posts, response.data]
                setPosts(newPosts)
                resetForm();
                return true
            })
            .then(() => {
                navigate(`/post/${key}`);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            })
            
    }};

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
                Song is Selected:
                <input
                    type="checkbox"
                    id="isLinkSelected"
                    name="isLinkSelected"
                    checked={formData.isLinkSelected}
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
