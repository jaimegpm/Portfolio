import { useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { setupIntersectionObserver } from '../../utils/animations';

/**
 * Skills Component
 * Technical skills section of the portfolio
 * Following BEM methodology for classes
 */
const Skills = () => {
  const skillsRef = useRef(null);
  
  // Effect for scroll animations
  useEffect(() => {
    if (skillsRef.current) {
      // Set up the intersection observer
      const observer = setupIntersectionObserver(
        skillsRef.current,
        { threshold: 0.2 },
        (target) => {
          // Animate progress bars with staggered delay
          const skillBars = target.querySelectorAll('.skills__progress-bar');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.progress;
            }, 100 * index);
          });
        }
      );
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, []);
  
  // Technical skills data
  const technicalSkills = [
    { name: 'HTML/CSS', progress: '90%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'JavaScript', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', progress: '80%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'React Native', progress: '75%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Java', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Tailwind CSS', progress: '85%', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  ];
  
  // Other skills data
  const otherSkills = [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    { name: 'AWS', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  ];
  
  // Soft skills data
  const softSkills = [
    { name: 'Communication', value: 85 },
    { name: 'Teamwork', value: 90 },
    { name: 'Problem Solving', value: 85 },
    { name: 'Adaptability', value: 90 },
    { name: 'Time Management', value: 80 },
    { name: 'Creativity', value: 85 },
  ];
  
  return (
    <section id="skills" className="skills py-20 bg-white dark:bg-background-dark">
      <div className="skills__container container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="My Skills" 
          highlight="Skills"
          subtitle="Technologies and tools I work with"
        />
        
        <div ref={skillsRef} className="skills__content">
          {/* Technical skills with progress bars */}
          <div className="skills__technical mb-16">
            <h3 className="skills__subtitle text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Technical Skills
            </h3>
            <div className="skills__technical-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="skills__item p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="skills__item-header flex items-center justify-between mb-3">
                    <div className="skills__item-title flex items-center">
                      <div className="skills__item-icon-wrapper p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm mr-3">
                        <img src={skill.icon} alt={skill.name} className="skills__item-icon w-6 h-6" />
                      </div>
                      <span className="skills__item-name font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                    </div>
                    <span className="skills__item-percentage text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-medium">
                      {skill.progress}
                    </span>
                  </div>
                  <div className="skills__progress h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="skills__progress-bar h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '0%' }}
                      data-progress={skill.progress}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Other technical skills (icons) */}
          <div className="skills__other mb-16">
            <h3 className="skills__subtitle text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Other Technologies
            </h3>
            <div className="skills__other-grid grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
              {otherSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skills__other-item flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="skills__other-icon-wrapper p-3 bg-white dark:bg-gray-700 rounded-full mb-3 shadow-sm">
                    <img src={skill.icon} alt={skill.name} className="skills__other-icon w-8 h-8" />
                  </div>
                  <span className="skills__other-name text-sm text-center text-gray-700 dark:text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft skills (circular chart) */}
          <div className="skills__soft">
            <h3 className="skills__subtitle text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Soft Skills
            </h3>
            <div className="skills__soft-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skills__soft-item flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="skills__soft-chart relative w-24 h-24 mb-4">
                    {/* Background circle */}
                    <svg className="skills__soft-circle w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        className="skills__soft-circle-bg text-gray-200 dark:text-gray-700 stroke-current" 
                        strokeWidth="10" 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent"
                      />
                      <circle 
                        className="skills__soft-circle-progress stroke-current" 
                        strokeWidth="10" 
                        strokeLinecap="round" 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.value / 100)}`}
                        transform="rotate(-90 50 50)"
                        style={{
                          stroke: 'url(#gradient)',
                          transition: 'stroke-dashoffset 1.5s ease-in-out'
                        }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--color-primary)" />
                          <stop offset="100%" stopColor="var(--color-secondary)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="skills__soft-percentage absolute inset-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {skill.value}%
                    </div>
                  </div>
                  <span className="skills__soft-name text-center font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 