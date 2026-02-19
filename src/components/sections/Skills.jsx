import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useMemo, useRef } from 'react';

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

  const renderSkillItem = (skill, index, prefix) => (
    <div key={`${prefix}-${index}`} className="skills__tech-item">
      <div className="skills__tech-icon-wrapper">
        <img src={skill.icon} alt={skill.name} className="skills__tech-icon" loading="lazy" />
      </div>
      <span className="skills__tech-name">{skill.name}</span>
    </div>
  );

  const LOOP_MULTIPLIER = 3;

  const MarqueeRow = ({ skills, duration, reverse, prefix }) => {
    const repeatedSkills = useMemo(
      () => Array.from({ length: LOOP_MULTIPLIER }, () => skills).flat(),
      [skills],
    );
    const segmentRef = useRef(null);
    const trackRef = useRef(null);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(null);
    const offsetRef = useRef(0);
    const segmentWidthRef = useRef(0);
    const speedRef = useRef(0);

    useEffect(() => {
      const parseDurationToSeconds = (value) => {
        if (typeof value === 'number') {
          return value;
        }
        const parsed = Number.parseFloat(String(value).replace('s', ''));
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
      };

      const updateMetrics = () => {
        const previousWidth = segmentWidthRef.current;
        const width = segmentRef.current?.offsetWidth ?? 0;
        segmentWidthRef.current = width;
        const seconds = parseDurationToSeconds(duration);
        speedRef.current = width > 0 ? width / seconds : 0;
        if (width > 0 && trackRef.current) {
          if (previousWidth > 0) {
            const normalizedProgress = ((-offsetRef.current / previousWidth) % 1 + 1) % 1;
            offsetRef.current = -normalizedProgress * width;
          } else {
            offsetRef.current = reverse ? -width : 0;
          }
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      };

      const tick = (now) => {
        if (!trackRef.current || !segmentWidthRef.current || !speedRef.current) {
          animationRef.current = requestAnimationFrame(tick);
          return;
        }

        if (lastTimeRef.current == null) {
          lastTimeRef.current = now;
          animationRef.current = requestAnimationFrame(tick);
          return;
        }

        const deltaSeconds = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        const direction = reverse ? 1 : -1;
        const delta = direction * speedRef.current * deltaSeconds;
        const width = segmentWidthRef.current;
        let nextOffset = offsetRef.current + delta;

        // Keep offset in range [-width, 0] to maintain a seamless loop.
        while (nextOffset > 0) {
          nextOffset -= width;
        }
        while (nextOffset <= -width) {
          nextOffset += width;
        }

        offsetRef.current = nextOffset;
        trackRef.current.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
        animationRef.current = requestAnimationFrame(tick);
      };

      const onVisibilityChange = () => {
        // Reset frame delta after tab switch to avoid visible jumps.
        lastTimeRef.current = null;
      };

      updateMetrics();

      const observer = new ResizeObserver(updateMetrics);
      if (segmentRef.current) {
        observer.observe(segmentRef.current);
      }

      document.addEventListener('visibilitychange', onVisibilityChange);
      animationRef.current = requestAnimationFrame(tick);

      return () => {
        if (animationRef.current != null) {
          cancelAnimationFrame(animationRef.current);
        }
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }, [duration, reverse]);

    return (
      <div className="skills__marquee mb-4">
        <div
          className="skills__marquee-content"
          ref={trackRef}
        >
          <div className="skills__marquee-segment" ref={segmentRef}>
            {repeatedSkills.map((skill, index) => renderSkillItem(skill, index, `${prefix}-a`))}
          </div>
          <div className="skills__marquee-segment">
            {repeatedSkills.map((skill, index) => renderSkillItem(skill, index, `${prefix}-b`))}
          </div>
        </div>
      </div>
    );
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

          <MarqueeRow skills={frontendSkills} duration="25s" prefix="frontend" />
          <MarqueeRow skills={backendSkills} duration="22s" reverse prefix="backend" />
          <MarqueeRow skills={toolsSkills} duration="30s" prefix="tools" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
