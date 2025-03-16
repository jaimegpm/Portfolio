import { useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { setupIntersectionObserver } from '../../utils/animations';

/**
 * Skills Component
 * Technical skills section of the portfolio with infinite scrolling animation
 * Following BEM methodology for classes
 */
const Skills = () => {
  const skillsRef = useRef(null);
  
  // Effect for scroll animations
  useEffect(() => {
    if (skillsRef.current) {
      // Set up the intersection observer for soft skills animation
      const observer = setupIntersectionObserver(
        skillsRef.current,
        { threshold: 0.2 },
        (target) => {
          // Animate soft skills charts with staggered delay
          const skillCharts = target.querySelectorAll('.skills__soft-circle-progress');
          skillCharts.forEach((chart, index) => {
            setTimeout(() => {
              chart.style.strokeDashoffset = chart.dataset.progress;
            }, 150 * index);
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
  
  // Tech skills for each row
  const frontendSkills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'SASS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  ];
  
  const backendSkills = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  ];
  
  const toolsSkills = [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
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
  
  // Crear conjuntos duplicados para asegurar una animación continua
  const createInfiniteLoop = (skills) => {
    return [...skills, ...skills, ...skills];
  };
  
  return (
    <section id="skills" className="skills py-20 bg-white dark:bg-background-dark overflow-hidden">
      <div className="skills__container container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="My Skills" 
          highlight="Skills"
          subtitle="Technologies and tools I work with"
        />
        
        {/* Infinite scrolling tech skills */}
        <div className="skills__tech-scroll mb-12">
          <h3 className="skills__subtitle text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
            Technical Skills
          </h3>
          
          {/* Row 1 - Frontend - Velocidad normal */}
          <div className="skills__marquee mb-4">
            <div className="skills__marquee-track animate-scroll-left flex" style={{ animationDuration: '25s' }}>
              {createInfiniteLoop(frontendSkills).map((skill, index) => (
                <div key={`frontend-${index}`} className="skills__tech-item flex flex-col items-center mx-8">
                  <div className="skills__tech-icon-wrapper shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <img src={skill.icon} alt={skill.name} className="skills__tech-icon" />
                  </div>
                  <span className="skills__tech-name text-gray-500 dark:text-gray-400 text-xs mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 2 - Backend - Velocidad más rápida */}
          <div className="skills__marquee mb-4">
            <div className="skills__marquee-track animate-scroll-right flex" style={{ animationDuration: '20s' }}>
              {createInfiniteLoop(backendSkills).map((skill, index) => (
                <div key={`backend-${index}`} className="skills__tech-item flex flex-col items-center mx-8">
                  <div className="skills__tech-icon-wrapper shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <img src={skill.icon} alt={skill.name} className="skills__tech-icon" />
                  </div>
                  <span className="skills__tech-name text-gray-500 dark:text-gray-400 text-xs mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 3 - Tools - Velocidad más lenta */}
          <div className="skills__marquee">
            <div className="skills__marquee-track animate-scroll-left flex" style={{ animationDuration: '30s' }}>
              {createInfiniteLoop(toolsSkills).map((skill, index) => (
                <div key={`tools-${index}`} className="skills__tech-item flex flex-col items-center mx-8">
                  <div className="skills__tech-icon-wrapper shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <img src={skill.icon} alt={skill.name} className="skills__tech-icon" />
                  </div>
                  <span className="skills__tech-name text-gray-500 dark:text-gray-400 text-xs mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Soft skills (circular chart) */}
        <div ref={skillsRef} className="skills__soft">
          <h3 className="skills__subtitle text-xl font-semibold mb-8 text-gray-800 dark:text-gray-200 text-center">
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
                      strokeDashoffset={`${2 * Math.PI * 40}`}
                      data-progress={`${2 * Math.PI * 40 * (1 - skill.value / 100)}`}
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
    </section>
  );
};

export default Skills; 