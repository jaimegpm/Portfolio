import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../ui/SectionTitle';
import { setupIntersectionObserver, animateElementsWithDelay } from '../../utils/animations';
import { EMAILJS_CONFIG } from '../../config/emailjs';

/**
 * Contact Component
 * Contact section of the portfolio
 * Following BEM methodology for classes
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Effect for scroll animations
  useEffect(() => {
    if (sectionRef.current) {
      // Set up the intersection observer
      const observer = setupIntersectionObserver(
        sectionRef.current,
        { threshold: 0.1 },
        (target) => {
          // Animate info items with staggered delay
          animateElementsWithDelay(
            target,
            '.contact__info-item',
            'animate-slide-right',
            150
          );
          
          // Animate the form
          const form = target.querySelector('.contact__form-container');
          if (form) {
            setTimeout(() => {
              form.classList.add('animate-slide-left');
              form.style.opacity = '1';
            }, 300);
          }
        }
      );
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, []);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // EmailJS configuration
    const serviceId = EMAILJS_CONFIG.serviceId;
    const templateId = EMAILJS_CONFIG.templateId;
    const publicKey = EMAILJS_CONFIG.publicKey;
    
    // Send email using EmailJS
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSubmitting(false);
        setSubmitStatus('error');
        setErrorMessage('There was an error sending your message. Please try again later.');
        
        // Reset error state after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          setErrorMessage('');
        }, 5000);
      });
  };
  
  // Contact information data
  const contactInfo = [
    {
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Email',
      value: 'garciapagemajaime@gmail.com',
      link: 'mailto:garciapagemajaime@gmail.com',
    },
    {
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      title: 'Phone',
      value: 'Available upon request',
      link: '#',
    },
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Location',
      value: 'Spain',
      link: 'https://maps.google.com/?q=Spain',
    },
  ];
  
  return (
    <section id="contact" className="contact py-20 bg-white dark:bg-background-dark relative">
      {/* Decorative elements */}
      <div className="contact__decoration-1 absolute top-0 left-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="contact__decoration-2 absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div ref={sectionRef} className="contact__container container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="Contact" 
          highlight="Contact"
          subtitle="Have a project in mind? Let's talk!"
        />
        
        <div className="contact__content grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact information */}
          <div className="contact__info">
            <div className="contact__text mb-8">
              <h3 className="contact__subtitle text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Let's discuss your project!
              </h3>
              <p className="contact__description text-gray-600 dark:text-gray-400">
                I'm interested in internship opportunities and challenging projects. If you have a question or proposal, don't hesitate to contact me using the form or through my contact details.
              </p>
            </div>
            
            {/* Contact information list */}
            <ul className="contact__info-list space-y-6">
              {contactInfo.map((item, index) => (
                <li 
                  key={index} 
                  className="contact__info-item flex items-start opacity-0 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="contact__info-icon-wrapper mr-4 p-3 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-full">
                    <svg className="contact__info-icon w-6 h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div className="contact__info-content">
                    <h4 className="contact__info-title text-lg font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <a 
                      href={item.link} 
                      className="contact__info-value text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Social media */}
            <div className="contact__social mt-8">
              <h4 className="contact__social-title text-lg font-medium text-gray-900 dark:text-white mb-4">
                Follow me on social media
              </h4>
              <div className="contact__social-links flex space-x-4">
                {[
                  { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', link: 'https://github.com/jaimegpm' },
                  { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', link: '#' },
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', link: '#' },
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white dark:hover:from-primary dark:hover:to-secondary dark:hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="contact__form-container bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 opacity-0 transition-all duration-500">
            <h3 className="contact__form-title text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send me a message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="contact__form space-y-6">
              {/* Form fields */}
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label block text-gray-700 dark:text-gray-300 mb-2">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="contact__form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label block text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  className="contact__form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="subject" className="contact__form-label block text-gray-700 dark:text-gray-300 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required
                  className="contact__form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-all duration-300"
                  placeholder="Message subject"
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label block text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  rows="5"
                  className="contact__form-textarea w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div className="contact__form-submit">
                <button 
                  type="submit" 
                  className="contact__form-button w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              
              {/* Success message */}
              {submitStatus === 'success' && (
                <div className="contact__form-success bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md p-4 mt-4 animate-fade-in">
                  <div className="flex">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Your message has been sent successfully. I'll get back to you soon!</span>
                  </div>
                </div>
              )}
              
              {/* Error message */}
              {submitStatus === 'error' && (
                <div className="contact__form-error bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md p-4 mt-4 animate-fade-in">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage || 'There was an error sending your message. Please try again later.'}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;