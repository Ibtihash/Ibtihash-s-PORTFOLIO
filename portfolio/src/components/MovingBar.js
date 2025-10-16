import React from 'react';
import './MovingBar.css';

const MovingBar = () => {
  const skills = [
    { name: 'NextJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'NodeJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
 ];

  return (
    <div className="moving-bar-container">
      <div className="flex animate-scroll hover:animate-paused gap-12 md:gap-20 w-max">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 group transition-all duration-300">
            <img 
              src={skill.icon}
              alt={skill.name}
              className="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-60"
              width="30"
              height="30"
              loading="lazy"
            />
            <span className="text-lg font-medium text-[var(--white-icon)]">
              {skill.name}
            </span>
          </div>
        ))}
        {/* Duplicate the skills for seamless infinite scroll */}
        {skills.map((skill, index) => (
          <div key={`duplicate-${index}`} className="flex items-center gap-2 group transition-all duration-300">
            <img 
              src={skill.icon}
              alt={skill.name}
              className="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-60"
              width="30"
              height="30"
              loading="lazy"
            />
            <span className="text-lg font-medium text-[var(--white-icon)]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingBar;