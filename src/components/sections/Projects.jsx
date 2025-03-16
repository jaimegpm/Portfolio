import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { projectImages } from '../../data/placeholderImages';
import { setupIntersectionObserver, animateElementsWithDelay } from '../../utils/animations';

/**
 * Projects section component displaying portfolio work with filtering and animations
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsRef = useRef(null);
  
  // Project data array
  const projects = [
    {
      id: 1,
      title: 'Sports Betting Platform',
      description: 'An interactive sports betting platform featuring real-time odds updates, user authentication, and a responsive design. Users can place virtual bets on various sports events, track their betting history, and compete on a global leaderboard.',
      image: projectImages.webProject1,
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
      demoUrl: 'https://jaimegpm.github.io/BettingsGPM/',
      codeUrl: 'https://github.com/jaimegpm/BettingsGPM',
    },
    {
      id: 2,
      title: 'Lost Ark Bus Tool',
      description: 'A specialized utility for Lost Ark players who run "bus services" in raids. This tool calculates optimal gold distribution among party members, tracks contributions, and provides a clean interface for managing payments after successful raid completions.',
      image: projectImages.webProject2,
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      demoUrl: 'https://jaimegpm.github.io/bus-tool/',
      codeUrl: 'https://github.com/jaimegpm/bus-tool',
    },
    {
      id: 3,
      title: 'Library Management System',
      description: 'A robust Java desktop application for comprehensive library management. Features include book cataloging with search functionality, member registration and tracking, loan management with due date notifications, and detailed reporting. Built with a user-friendly Swing interface and JDBC for database operations.',
      image: projectImages.desktopProject1,
      category: 'desktop',
      technologies: ['Java', 'JDBC', 'SQL', 'Swing'],
      demoUrl: null,
      codeUrl: 'https://github.com/jaimegpm/Biblioteca',
    },
    {
      id: 4,
      title: 'HEIC to JPG Converter',
      description: 'A lightweight yet powerful Python utility that solves the common problem of converting HEIC images from iOS devices to the universally compatible JPG format. Features batch processing capabilities, metadata preservation, and a simple command-line interface for efficient workflow integration.',
      image: projectImages.webProject3,
      category: 'desktop',
      technologies: ['Python', 'Image Processing'],
      demoUrl: null,
      codeUrl: 'https://github.com/jaimegpm/Heic-to-JPG',
    },
  ];
  
  // Available filter categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web' },
    { id: 'desktop', name: 'Desktop' },
  ];
  
  // Handle project filtering with animation
  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    
    setVisibleProjects([]);
    setTimeout(() => {
      setVisibleProjects(filtered);
    }, 300);
  }, [activeFilter]);
  
  // Setup scroll animations for project cards
  useEffect(() => {
    if (projectsRef.current && visibleProjects.length > 0) {
      const observer = setupIntersectionObserver(
        projectsRef.current, 
        { threshold: 0.1 }, 
        (target) => {
          animateElementsWithDelay(
            target, 
            '.projects__item', 
            'animate-fade-in', 
            150
          );
        }
      );
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [visibleProjects]);
  
  return (
    <section id="projects" className="projects py-20 bg-gray-50 dark:bg-gray-900">
      <div className="projects__container container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="My Projects" 
          highlight="Projects"
          subtitle="A selection of my recent work and academic projects"
        />
        
        {/* Category filter buttons */}
        <div className="projects__filters flex flex-wrap justify-center mb-12 max-w-md mx-auto">
          {categories.map(category => (
            <button
              key={category.id}
              className={`projects__filter-btn px-6 py-2.5 mx-3 mb-3 rounded-full transition-colors ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Project grid */}
        <div 
          ref={projectsRef}
          className="projects__grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto"
        >
          {visibleProjects.map(project => (
            <div 
              key={project.id} 
              className="projects__item opacity-0 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              style={{ transitionDelay: `${(project.id - 1) * 100}ms` }}
            >
              <div className="projects__item-container relative overflow-hidden h-96 sm:h-80 md:h-72 lg:h-80">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="projects__item-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter group-hover:brightness-50"
                />
                
                <div className="projects__item-title-container absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transform transition-all duration-500 ease-out group-hover:translate-y-full">
                  <h3 className="projects__item-title text-xl font-bold text-white flex items-center">
                    {project.title}
                    <svg className="w-5 h-5 ml-2 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 opacity-80">Click to view details</p>
                </div>
                
                {/* Hover overlay with project details */}
                <div className="projects__item-overlay absolute inset-0 bg-gradient-to-b from-primary-dark/90 to-secondary/90 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                  <h3 className="projects__item-title text-2xl font-bold mb-4 text-white transform translate-y-4 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.title}
                  </h3>
                  <p className="projects__item-description text-white/90 mb-6 transform translate-y-4 opacity-0 transition-all duration-300 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.description}
                  </p>
                  
                  <div className="projects__item-technologies flex flex-wrap gap-2 mb-6 transform translate-y-4 opacity-0 transition-all duration-300 delay-150 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="projects__item-tech px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="projects__item-actions flex space-x-4 mt-auto transform translate-y-4 opacity-0 transition-all duration-300 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__item-link flex items-center px-4 py-2 bg-white rounded-md text-primary hover:bg-gray-100 transition-colors transform hover:scale-105"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="projects__item-link flex items-center px-4 py-2 bg-white rounded-md text-primary hover:bg-gray-100 transition-colors transform hover:scale-105"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View more projects button */}
        <div className="projects__more text-center mt-16">
          <a 
            href="https://github.com/jaimegpm?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="projects__more-btn inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white hover:text-white dark:text-white dark:hover:text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg"
          >
            View More Projects
            <svg className="w-5 h-5 ml-2 text-white dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;