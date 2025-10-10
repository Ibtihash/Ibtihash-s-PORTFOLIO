import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { FaCode, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import MovingBar from '../components/MovingBar';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [githubStats, setGithubStats] = useState({
    totalRepos: 0,
    technologies: [],
    loading: true,
    error: null
  });

  const [profileRef, isProfileVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [projectsRef, isProjectsVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    // Fetch profile, skills, and projects data
    axios.get('/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('/skills')
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch GitHub statistics
    const fetchGithubStats = async () => {
      try {
        // Add Accept header to ensure we get the v3 version of the API
        const headers = {
          'Accept': 'application/vnd.github.v3+json'
        };

        const userResponse = await axios.get('https://api.github.com/users/Ibtihash', { headers });
        const reposResponse = await axios.get('https://api.github.com/users/Ibtihash/repos?per_page=100', { headers });
        
        // Get total repositories
        const totalRepos = userResponse.data.public_repos;
        
        // Get technologies used
        const technologies = new Set();
        reposResponse.data.forEach(repo => {
          if (repo.language) {
            technologies.add(repo.language);
          }
        });

        setGithubStats({
          totalRepos: totalRepos || 0,
          technologies: Array.from(technologies) || [],
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats({
          totalRepos: 0,
          technologies: [],
          loading: false,
          error: 'Failed to load GitHub stats'
        });
      }
    };

    fetchGithubStats();
  }, []);

  return (
    <div className="container home-container">
      <div className="hero-section text-center">
        <h1 className="hero-title">Ibtihash Wasiq</h1>
        <TypeAnimation
          sequence={[
            'A Frontend Developer',
            1000,
            'A React Specialist',
            1000,
            'A Node.js Expert',
            1000,
            'A MERN Stack Developer',
            1000,
          ]}
          wrapper="h2"
          speed={50}
          className="hero-subtitle"
          repeat={Infinity}
        />
        <p className="hero-description">I build things for the web. I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences.</p>
        <a href="#projects" className="btn btn-primary hero-btn">Check out my projects!</a>
        
        <div className={`github-stats ${githubStats.loading ? 'loading' : ''}`}>
          <div className="stat-bar">
            <div className="stat-label">
              <FaGithub className="github-icon" />
              Total Repositories
            </div>
            <div className="stat-value">
              {githubStats.loading ? 'Loading...' : githubStats.totalRepos}
            </div>
          </div>
          <div className="stat-bar">
            <div className="stat-label">
              <FaCode className="github-icon" />
              Technologies Used
            </div>
            <div className="stat-value">
              {githubStats.loading ? 'Loading...' : githubStats.technologies.length}
            </div>
            <div className="technologies-list">
              {githubStats.loading
                ? 'Loading technologies...'
                : githubStats.technologies.length > 0
                  ? githubStats.technologies.join(', ')
                  : 'No technologies found'}
            </div>
          </div>
        </div>
      </div>

      {profile && (
        <div
          ref={profileRef}
          className={`row align-items-center justify-content-center profile-section ${isProfileVisible ? 'animate-fade-in' : 'hidden'}`}
        >
          <div className="col-12 text-center">
            <h2 className="profile-name">About Me</h2>
            <p className="profile-description">
              Hello! I'm Ibtihash, a software engineer based in New York, NY. I have a passion for building beautiful and functional web applications. I have a proven track record of success in various projects, and I am proficient in a range of modern technologies, including {skills.map(skill => skill.name).join(', ')}. I am always eager to learn and apply new skills to create innovative and efficient solutions.
            </p>
          </div>
        </div>
      )}

      <hr className="section-divider" />

      <MovingBar />

      <hr className="section-divider" />

      <div
        id="projects"
        ref={projectsRef}
        className={`projects-section ${isProjectsVisible ? 'animate-scale-in' : 'hidden'}`}
      >
        <h2 className="text-center mb-4 section-heading">Projects</h2>
        <div className="row">
          {projects.map(project => (
            <div className="col-md-4 d-flex" key={project._id}>
              <div className="card mb-4 custom-card w-100">
                <div className="card-body">
                  <h5 className="custom-card-title">{project.title}</h5>
                  <p className="custom-card-text">{project.description}</p>
                  {/* Project images should be placed in the public/images directory.
                      The naming convention is project-title.png, where the title is lowercase and spaces are replaced with hyphens.
                      For example, a project named "My Project" should have an image named "my-project.png". */}
                  <img
                    src={`/images/${project.title.toLowerCase().replace(/ /g, '-')}.png`}
                    alt={project.title}
                    className="img-fluid project-image mb-3"
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = "https://placehold.co/150.png?text=Image+needed";
                    }}
                  />
                  <div className="d-flex justify-content-between">
                    <a href={project.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Project</a>
                    <a href={project.githubLink} className="btn btn-secondary" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <footer className="text-center custom-footer">
         <div className="social-icons">
    <a href="https://github.com/Ibtihash" target="_blank" rel="noopener noreferrer">
      <FaGithub />
    </a>
    <a href="https://www.linkedin.com/in/syed-ibtihash-wasiq-286326286/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
    <a href="mailto:syedibtihash@gmail.com" target="_blank" rel="noopener noreferrer">
      <FaEnvelope />
    </a>
  </div>
        <p>&copy; {new Date().getFullYear()} Ibtihash Wasiq. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;