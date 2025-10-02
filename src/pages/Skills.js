import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Skills.css';
import { FaReact, FaNodeJs, FaDatabase, FaCode } from 'react-icons/fa';

const skillIconMapping = {
  React: <FaReact />,
  'Node.js': <FaNodeJs />,
  MongoDB: <FaDatabase />,
  JavaScript: <FaCode />,
  // Add more mappings as needed
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingSkill) {
      axios.post(`/skills/update/${editingSkill._id}`, { name })
        .then(res => {
          console.log(res.data);
          setEditingSkill(null);
          setName('');
          // Refresh skills
          axios.get('/skills')
            .then(response => {
              setSkills(response.data);
            });
        });
    } else {
      axios.post('/skills/add', { name })
        .then(res => {
          console.log(res.data);
          setName('');
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
  };

  return (
    <div className="container skills-container">
      <h1 className="text-center mb-5 section-heading">Manage Skills</h1>

      <form onSubmit={handleSubmit} className="skill-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Skill Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter skill name" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
      </form>

      <div className="row">
        {skills.map(skill => (
          <div className="col-md-4 d-flex" key={skill._id}>
            <div className="card mb-4 custom-card w-100">
              <div className="card-body text-center custom-card-body">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="skill-icon">{skillIconMapping[skill.name] || <FaCode />}</div>
                  <h5 className="custom-card-title mb-0">{skill.name}</h5>
                </div>
                <div className="mt-3">
                  <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEdit(skill)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(skill._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;