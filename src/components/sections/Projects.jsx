import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { projectImages } from '../../data/placeholderImages';
import { setupIntersectionObserver, animateElementsWithDelay } from '../../utils/animations';

/**
 * Projects Component
 * Portfolio projects section
 * Following BEM methodology for classes
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsRef = useRef(null);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio',
      description: 'A responsive portfolio website built with React and Tailwind CSS featuring dark mode and smooth animations.',
      image: projectImages.webProject3,
      category: 'web',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
    {
      id: 2,
      title: 'E-commerce App',
      description: 'Mobile application for online shopping with user authentication, product catalog, and shopping cart functionality.',
      image: projectImages.mobileProject1,
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'JavaScript'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'Web application for managing tasks and projects with drag-and-drop functionality and team collaboration features.',
      image: projectImages.webProject1,
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Interactive weather application that displays real-time weather data and forecasts using external API integration.',
      image: projectImages.webProject2,
      category: 'web',
      technologies: ['JavaScript', 'HTML/CSS', 'API Integration'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      description: 'Mobile app for tracking workouts, nutrition, and fitness progress with personalized recommendations.',
      image: projectImages.mobileProject2,
      category: 'mobile',
      technologies: ['React Native', 'Redux', 'Firebase'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
    {
      id: 6,
      title: 'Inventory Management',
      description: 'Desktop application for managing inventory, sales, and customer data for small businesses.',
      image: projectImages.desktopProject1,
      category: 'desktop',
      technologies: ['Electron', 'React', 'SQLite'],
      demoUrl: '#',
      codeUrl: 'https://github.com/jaimegpm',
    },
  ];
  
  // Filter categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'desktop', name: 'Desktop' },
  ];
  
  // Effect for filtering projects
  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
    
    // Fade animation
    setVisibleProjects([]);
    setTimeout(() => {
      setVisibleProjects(filtered);
    }, 300);
  }, [activeFilter]);
  
  // Effect for scroll animations
  useEffect(() => {
    if (projectsRef.current && visibleProjects.length > 0) {
      // Set up the intersection observer
      const observer = setupIntersectionObserver(
        projectsRef.current, 
        { threshold: 0.1 }, 
        (target) => {
          // Animate projects with staggered delay
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
        
        {/* Filters */}
        <div className="projects__filters flex flex-wrap justify-center mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`projects__filter-btn px-6 py-2 mx-2 mb-2 rounded-full transition-colors ${
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
        
        {/* Projects */}
        <div 
          ref={projectsRef}
          className="projects__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleProjects.map(project => (
            <div 
              key={project.id} 
              className="projects__item opacity-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ transitionDelay: `${(project.id - 1) * 100}ms` }}
            >
              {/* Project image */}
              <div className="projects__item-image-container relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="projects__item-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="projects__item-overlay absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-secondary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="projects__item-actions flex space-x-4">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="projects__item-link p-3 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors transform hover:scale-110"
                      aria-label="View demo"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="projects__item-link p-3 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors transform hover:scale-110"
                      aria-label="View code"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project content */}
              <div className="projects__item-content p-6">
                <h3 className="projects__item-title text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="projects__item-description text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="projects__item-technologies flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="projects__item-tech px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Button to view more projects */}
        <div className="projects__more text-center mt-12">
          <a 
            href="https://github.com/jaimegpm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="projects__more-btn inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white hover:text-white dark:text-white dark:hover:text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg"
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