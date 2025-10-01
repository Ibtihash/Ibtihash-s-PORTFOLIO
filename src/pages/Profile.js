import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/profile')
      .then(response => {
        if (response.data) {
          setName(response.data.name);
          setDescription(response.data.description);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      name: name,
      description: description,
    };

    axios.post('/profile/update', updatedProfile)
      .then(res => {
        console.log(res.data);
      });
  };

  return (
    <div className="container profile-page-container">
      <h1 className="text-center mb-5 section-heading">Edit Profile</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a brief description" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;