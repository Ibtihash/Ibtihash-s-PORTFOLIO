import React, { useState, useEffect } from 'react';
import { skillOptions, fetchSkills, addSkill, updateSkill, deleteSkill } from '../utils/skillsData';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const skillsData = await fetchSkills();
    setSkills(skillsData);
  };

  const handleNameChange = (e) => {
    const selected = e.target.value;
    setSelectedSkill(selected);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return;

    const skillData = {
      name: selectedSkill,
      logo: skillOptions[selectedSkill]
    };

    try {
      await addSkill(skillData);
      await loadSkills();
      setSelectedSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSelectedSkill(skill.name);
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    if (!selectedSkill || !editingSkill) return;

    const skillData = {
      name: selectedSkill,
      logo: skillOptions[selectedSkill]
    };

    try {
      await updateSkill(editingSkill._id, skillData);
      await loadSkills();
      setEditingSkill(null);
      setSelectedSkill('');
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <div className="container skills-container">
      <h2 className="text-center mb-4">Manage Skills</h2>

      {/* Add/Edit Skill Form */}
      <form onSubmit={editingSkill ? handleUpdateSkill : handleAddSkill} className="mb-4">
        <div className="form-group">
          <label htmlFor="skillSelect" className="form-label">
            {editingSkill ? 'Update Skill' : 'Add New Skill'}
          </label>
          <select
            id="skillSelect"
            className="form-control"
            value={selectedSkill}
            onChange={handleNameChange}
            required
          >
            <option value="">Select a skill</option>
            {Object.keys(skillOptions).map((skillName) => (
              <option key={skillName} value={skillName}>
                {skillName}
              </option>
            ))}
          </select>
        </div>

        {selectedSkill && (
          <div className="mb-3 text-center">
            <img
              src={skillOptions[selectedSkill]}
              alt={selectedSkill}
              className="preview-logo"
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
          </div>
        )}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary flex-grow-1">
            {editingSkill ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingSkill && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingSkill(null);
                setSelectedSkill('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Skills Grid */}
      <div className="skills-grid">
        {skills.map(skill => (
          <div className="skill-card-wrapper" key={skill._id}>
            <div className="custom-card">
              <div className="card-content">
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <h5 className="custom-card-title">{skill.name}</h5>
                <div className="button-group">
                  <button 
                    className="action-button edit-button" 
                    onClick={() => handleEditSkill(skill)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete-button" 
                    onClick={() => handleDeleteSkill(skill._id)}
                  >
                    Delete
                  </button>
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