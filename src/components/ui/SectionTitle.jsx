/**
 * Renders a section title with optional subtitle and highlighted text
 * Uses BEM classes for consistent styling
 */
const SectionTitle = ({ title, subtitle, highlight, className = '' }) => {
  const renderTitle = () => {
    if (!highlight) return title;
    
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{highlight}</span>
        {parts[1]}
      </>
    );
  };
  
  return (
    <div className={`section-title text-center mb-16 ${className}`}>
      <h2 className="section-title__heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {renderTitle()}
      </h2>
      <div className="section-title__underline w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
      {subtitle && (
        <p className="section-title__subtitle text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;