import axios from 'axios';

// Shared skill options and utility functions for skill management
export const skillOptions = {
  'NextJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'NodeJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
};

export const getLogoForSkill = (skillName) => {
  return skillOptions[skillName] || '';
};

export const fetchSkills = async () => {
  try {
    const response = await axios.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const addSkill = async (skillData) => {
  try {
    const response = await axios.post('/skills/add', skillData);
    return response.data;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const updateSkill = async (id, skillData) => {
  try {
    const response = await axios.post(`/skills/update/${id}`, skillData);
    return response.data;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    const response = await axios.delete(`/skills/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};