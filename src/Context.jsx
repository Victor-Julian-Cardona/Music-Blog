import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const ProjectsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5005/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    return (
        <ProjectsContext.Provider value={projects}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsContext;
