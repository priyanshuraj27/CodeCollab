import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupCard from '../components/groupCard';
import { useSelector } from 'react-redux';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/projects', {
          withCredentials: true,
        });
        console.log('API response:', res.data); // <-- ADD THIS LINE
        setProjects(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
  
    fetchProjects();
  }, []);
  

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#3C4F67FF]' : 'bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7]'}`}>
      {projects.map((project, index) => (
        <GroupCard
          key={project._id || index}
          groupName={project.title}
          groupDescription={project.description}
          tags={project.tags || []} // can be null or array
        />
      ))}
    </div>
  );
};

export default Home;
