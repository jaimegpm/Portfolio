import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Skills Component
 * Displays technical skills with animated scroll effects
 */
const Skills = () => {
  const { t } = useLanguage();

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
  
  /**
   * Creates an infinite loop of skills by tripling the array
   */
  const createInfiniteLoop = (skills) => {
    return [...skills, ...skills, ...skills];
  };
  
  return (
    <section id="skills" className="skills py-20 bg-white dark:bg-background-dark overflow-hidden">
      <div className="skills__container container mx-auto px-4 md:px-6">
        <SectionTitle 
          title={t('skills.title')} 
          highlight={t('skills.highlight')}
          subtitle={t('skills.subtitle')}
        />
        
        <div className="skills__tech-scroll mb-12">
          <h3 className="skills__subtitle text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
            {t('skills.technical')}
          </h3>
          
          {/* Frontend skills - Normal speed */}
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
          
          {/* Backend skills - Fast speed */}
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
          
          {/* Tools skills - Slow speed */}
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
      </div>
    </section>
  );
};

export default Skills;