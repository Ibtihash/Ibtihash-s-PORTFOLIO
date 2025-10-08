
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SkillManager.css';

const SkillManager = () => {
  const skillOptions = {
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

  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    axios.get('/skills')
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setName(selectedName);
    setLogo(skillOptions[selectedName] || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillData = { 
      name, 
      logo: skillOptions[name] || logo 
    };

    if (editingSkill) {
      axios.post(`/skills/update/${editingSkill._id}`, skillData)
        .then(res => {
          console.log(res.data);
          setEditingSkill(null);
          setName('');
          setLogo('');
          // Refresh skills
          axios.get('/skills')
            .then(response => {
              setSkills(response.data);
            });
        });
    } else {
      axios.post('/skills/add', skillData)
        .then(res => {
          console.log(res.data);
          setName('');
          setLogo('');
          // Refresh skills
          axios.get('/skills')
            .then(response => {
              setSkills(response.data);
            });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/skills/${id}`)
      .then(res => {
        console.log(res.data);
        // Refresh skills
        axios.get('/skills')
          .then(response => {
            setSkills(response.data);
          });
      });
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setLogo(skill.logo);
  };

  return (
    <div className="skill-manager">
      <h1 className="text-center mb-5">Manage Skills</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Skill Name</label>
          <select 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={handleNameChange} 
            required
          >
            <option value="">Select a skill</option>
            {Object.keys(skillOptions).map((skillName) => (
              <option key={skillName} value={skillName}>{skillName}</option>
            ))}
          </select>
        </div>
        {logo && (
          <div className="mb-3 text-center">
            <img 
              src={logo} 
              alt={name} 
              className="preview-logo"
              style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
      </form>

      <div className="skills-list">
        {skills.map(skill => (
          <div className="skill-item" key={skill._id}>
            <div className="skill-item-name">{skill.name}</div>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEdit(skill)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(skill._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
