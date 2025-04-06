import React from 'react';
import GroupCard from '../components/groupCard';
import { useSelector } from 'react-redux';

const GroupPage = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const dummyGroups = [
    {
      groupName: 'Machine Learning Study Group',
      groupDescription: 'A group to discuss and collaborate on ML projects. Perfect for beginners and experts alike.',
      tags: ['ML', 'AI', 'Deep Learning', 'TensorFlow'],
    },
    {
      groupName: 'React Enthusiasts',
      groupDescription: 'A group for developers who love React. Share tips, projects, and resources.',
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    },
    {
      groupName: 'Cybersecurity Advocates',
      groupDescription: 'Join this group if you are interested in ethical hacking, security protocols, and best practices.',
      tags: ['Security', 'Ethical Hacking', 'Penetration Testing', 'CISSP'],
    },
    {
      groupName: 'Blockchain Builders',
      groupDescription: 'Explore the world of blockchain and cryptocurrency. Learn and share knowledge about decentralized technology.',
      tags: ['Blockchain', 'Cryptocurrency', 'Ethereum', 'Smart Contracts'],
    },
  ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#3C4F67FF]' : 'bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7]'}`}>
      {/* Background gradient for light mode */}
      {dummyGroups.map((group, index) => (
        <GroupCard
          key={index}
          groupName={group.groupName}
          groupDescription={group.groupDescription}
          tags={group.tags}
        />
      ))}
    </div>
  );
};

export default GroupPage;
