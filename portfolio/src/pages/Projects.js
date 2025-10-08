import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    axios.get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    if (file) {
      formData.append('file', file);
    }

    const url = editingProject
      ? `/projects/update/${editingProject._id}`
      : '/projects/add';

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
        setEditingProject(null);
        setTitle('');
        setDescription('');
        setLink('');
        setFile(null);
        
        // Refresh projects
        axios.get('/projects')
          .then(response => {
            setProjects(response.data);
          });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/projects/${id}`)
      .then(res => {
        console.log(res.data);
        // Refresh projects
        axios.get('/projects')
          .then(response => {
            setProjects(response.data);
          });
      });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);
  };

  return (
    <div className="container projects-container">
      <h1 className="text-center mb-5 section-heading">Manage Projects</h1>

      <form onSubmit={handleSubmit} className="project-form">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter project title" required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="link" className="form-label">Link</label>
              <input type="text" className="form-control" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter project link" required />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter project description" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Project Image</label>
          <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        
        <button type="submit" className="btn btn-primary w-100">{editingProject ? 'Update Project' : 'Add Project'}</button>
      </form>

      <div className="row">
        {projects.map(project => (
          <div className="col-md-4 d-flex" key={project._id}>
            <div className="card mb-4 custom-card w-100">
              <div className="card-body">
                <h5 className="custom-card-title">{project.title}</h5>
                <p className="custom-card-text">{project.description}</p>
                {project.imageUrl && (
                  <img
                    src={`/${project.imageUrl}`}
                    alt={project.title}
                    className="img-fluid project-image"
                  />
                )}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm mt-2">View Project</a>
                <div className="mt-3">
                  <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;