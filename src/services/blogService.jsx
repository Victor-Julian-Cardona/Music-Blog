// src/services/blogService.js
import axios from 'axios';

const baseUrl = 'http://localhost:3000/posts'; // Replace with your JSON Server URL

const getAllPosts = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export default { getAllPosts };
