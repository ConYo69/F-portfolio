import emailjs from 'emailjs-com';

// Initialize EmailJS with your User ID
// Replace 'YOUR_USER_ID' with your actual EmailJS User ID when you set up your account
emailjs.init('siF2PBniU2sXiNoHr');

// EmailJS service configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_y80pspi', // Replace with your EmailJS service ID
  templateId: 'template_kja2wrg', // Replace with your EmailJS template ID
  userId: 'siF2PBniU2sXiNoHr' // Replace with your EmailJS user ID
};

/**
 * Send an email using EmailJS
 * @param {Object} templateParams - Parameters to pass to the email template
 * @returns {Promise} - Promise resolving to the send result
 */
export const sendEmail = (templateParams) => {
  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams,
    EMAILJS_CONFIG.userId
  );
};

// Instructions to set up EmailJS:
// 1. Create an account at https://www.emailjs.com/
// 2. Create a new Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with the following template parameters:
//    - {{name}} - Sender's name
//    - {{email}} - Sender's email
//    - {{subject}} - Email subject
//    - {{message}} - Email message
// 4. Replace the placeholders above with your actual EmailJS credentials