/**
 * EmailJS Configuration
 * Contains public configuration and template parameters for EmailJS service.
 * Safe to include in repository as it only contains public keys.
 */

export const EMAILJS_CONFIG = {
  serviceId: 'service_nc140ql',
  templateId: 'template_6didsqd', // Template ID from EmailJS dashboard
  publicKey: 'xZPTuQyE8m1PdcGfQ', // Public API key
};

/**
 * Template parameters mapping for the contact form
 * Defines the field names expected by the EmailJS template
 */
export const TEMPLATE_PARAMS = {
  name: 'name',     
  email: 'email',    
  message: 'message',
  time: 'time',      
};

export default EMAILJS_CONFIG;