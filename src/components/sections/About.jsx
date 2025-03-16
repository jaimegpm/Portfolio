import { useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { aboutImages } from '../../data/placeholderImages';
import { setupIntersectionObserver } from '../../utils/animations';
import { useLanguage } from '../../context/LanguageContext';

/**
 * About Component
 * Displays personal information and professional background
 */
const About = () => {
  const sectionRef = useRef(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0';
      
      const observer = setupIntersectionObserver(sectionRef.current, { threshold: 0.1 }, (target) => {
        target.classList.add('animate-fade-in');
        target.style.opacity = '1';
      });
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, []);
  
  return (
    <section id="about" className="about py-20 bg-gray-50 dark:bg-gray-900">
      <div className="about__container container mx-auto px-4 md:px-6">
        <SectionTitle 
          title={t('about.title')} 
          highlight={t('about.highlight')}
          subtitle={t('about.subtitle')}
        />
        
        <div 
          ref={sectionRef}
          className="about__content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
        >
          {/* Profile Image Section */}
          <div className="about__image-container relative">
            <div className="about__image-decoration absolute -top-6 -left-6 w-full h-full border-2 border-primary dark:border-primary-light rounded-lg"></div>
            <div className="about__image relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src={aboutImages.developer2} 
                alt="Professional photo" 
                className="about__img w-full h-full object-cover"
              />
            </div>
            
            <div className="about__decoration-1 absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-lg"></div>
          </div>
          
          {/* Bio and Information Section */}
          <div className="about__text">
            <h3 className="about__name text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {t('about.name')}
              <span className="about__role block text-lg font-normal bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-1">
                {t('about.role')}
              </span>
            </h3>
            
            <div className="about__description text-gray-700 dark:text-gray-300 mb-8">
              <p className="mb-4">
                {t('about.description1')}
              </p>
              <p>
                {t('about.description2')}
              </p>
            </div>
            
            {/* Personal Details Card */}
            <div className="about__info-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t('about.personalInfo')}
              </h4>
              
              <div className="about__info space-y-4">
                <div className="about__info-row flex flex-col sm:flex-row sm:space-x-4">
                  <div className="about__info-item flex items-center mb-3 sm:mb-0 sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.nameLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm truncate">
                        {t('about.name')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="about__info-item flex items-center sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.emailLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm truncate">
                        garciapagemajaime@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="about__info-row flex flex-col sm:flex-row sm:space-x-4">
                  <div className="about__info-item flex items-center mb-3 sm:mb-0 sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.educationLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm">
                        {t('about.educationValue')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="about__info-item flex items-center sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.locationLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm">
                        {t('about.locationValue')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="about__info-row flex flex-col sm:flex-row sm:space-x-4">
                  <div className="about__info-item flex items-center mb-3 sm:mb-0 sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.availabilityLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm">
                        {t('about.availabilityValue')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="about__info-item flex items-center sm:flex-1">
                    <div className="about__info-icon-wrapper mr-3 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <span className="about__info-label text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        {t('about.githubLabel')}
                      </span>
                      <span className="about__info-value text-gray-900 dark:text-white text-sm">
                        github.com/jaimegpm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call-to-action Buttons */}
            <div className="about__actions flex flex-wrap gap-4">
              <a 
                href="docs/Curriculum Jaime.pdf" 
                download="Curriculum_Jaime_Garcia-Page.pdf"
                className="about__button about__button--cv px-6 py-3 bg-primary hover:bg-primary-dark text-white hover:text-white dark:text-white dark:hover:text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-white dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('about.downloadCV')}
              </a>
              <a 
                href="#contact" 
                className="about__button about__button--contact px-6 py-3 bg-white dark:bg-gray-800 text-primary dark:text-primary-light border border-primary dark:border-primary-light font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
              >
                {t('about.contactMe')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;