/**
 * Footer Component
 * Implements the footer of the portfolio
 * Following BEM methodology for classes
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer bg-gray-100 dark:bg-gray-900 py-12">
      <div className="footer__container container mx-auto px-4 md:px-6">
        <div className="footer__content grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and information */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo text-2xl font-bold text-primary-dark dark:text-primary-light mb-4 inline-block">
              Jaime García-Page<span className="text-accent">.</span>
            </a>
            <p className="footer__description text-gray-600 dark:text-gray-400 mt-4 max-w-md">
              Web developer specializing in creating attractive and functional digital experiences with modern technologies.
            </p>
            <div className="footer__social mt-6 flex space-x-4">
              {[
                { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', link: 'https://github.com/jaimegpm' },
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', link: '#' },
                { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', link: '#' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="footer__links">
            <h3 className="footer__heading text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="footer__links-list space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item} className="footer__links-item">
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="footer__link text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer__contact">
            <h3 className="footer__heading text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="footer__contact-list space-y-3">
              {[
                { label: 'Email', value: 'garciapagemajaime@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: 'Location', value: 'Spain', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                { label: 'Availability', value: 'Internship / Full-time', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              ].map((contact) => (
                <li key={contact.label} className="footer__contact-item flex items-start">
                  <svg className="w-5 h-5 text-primary dark:text-primary-light mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                  </svg>
                  <div>
                    <span className="footer__contact-label block text-sm text-gray-800 dark:text-gray-300">
                      {contact.label}:
                    </span>
                    <span className="footer__contact-value text-gray-600 dark:text-gray-400">
                      {contact.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="footer__copyright text-gray-600 dark:text-gray-400">
            © {currentYear} Jaime García-Page. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 