import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { sendEmail } from '../../utils/emailConfig';
import './Contact.css';
import { fadeIn, slideUp, staggerContainer, slideInLeft, slideInRight } from '../../utils/animationConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() !== '';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'message':
        return value.trim() !== '';
      default:
        return true;
    }
  };
  
  const getErrorMessage = (name) => {
    if (!touched[name]) return null;
    
    switch (name) {
      case 'name':
        return formData.name.trim() === '' ? 'Name is required' : null;
      case 'email':
        return !formData.email ? 'Email is required' : 
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email address' : null;
      case 'message':
        return formData.message.trim() === '' ? 'Message is required' : null;
      default:
        return null;
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear form error when user starts typing
    if (formStatus.error) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: false,
        message: ''
      });
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouched({
      name: true,
      email: true,
      message: true
    });
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      
      // Focus the first empty required field
      if (!formData.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (!formData.email) {
        formRef.current.email.focus();
      } else if (!formData.message) {
        formRef.current.message.focus();
      }
      
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Please enter a valid email address.'
      });
      formRef.current.email.focus();
      return;
    }
    
    // Set submitting state
    setFormStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: 'Sending your message...'
    });
    
    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Message from Portfolio Website',
        message: formData.message
      };
      
      // Send email using EmailJS
      await sendEmail(templateParams);
      
      // Set success state
      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset touched state
      setTouched({
        name: false,
        email: false,
        message: false
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'There was an error sending your message. Please try again or contact me directly via email.'
      });
    }
  };
  
  const resetForm = () => {
    setFormStatus({
      submitting: false,
      submitted: false,
      error: false,
      message: ''
    });
    
    // Reset touched state
    setTouched({
      name: false,
      email: false,
      message: false
    });
  };
  
  const contactInfo = [
    { 
      icon: <FaEnvelope />, 
      title: 'Email', 
      content: 'santinlowilliambryan@gmail.com',
      link: 'https://mailto:santinlowilliambryan@gmail.com',
      ariaLabel: 'Send email'
    },
    { 
      icon: <FaPhone />, 
      title: 'Phone', 
      content: '+63 915 763 0988',
      link: 'tel:+11234567890',
      ariaLabel: 'Call phone number'
    },
    { 
      icon: <FaMapMarkerAlt />, 
      title: 'Location', 
      content: 'Feliciano Drive, San Roque, Zamboanga City, 7000, Philippines',
      link: null,
      ariaLabel: null
    }
  ];
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/ConYo69', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/william-bryan-santinlo-7b5395361', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://x.com/Conqwerty1', label: 'Twitter' }
  ];

  // Animation variants
  const formInputVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    }),
    focus: {
      scale: 1.01,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      borderColor: 'rgba(212, 0, 0, 0.5)',
      transition: {
        duration: 0.2
      }
    }
  };

  const socialIconVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8 
    },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.1 + 0.5,
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      y: -5,
      scale: 1.1,
      color: "#d40000",
      transition: {
        duration: 0.2
      }
    }
  };

  const formSuccessVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const submitButtonVariants = {
    idle: {
      scale: 1
    },
    submitting: {
      scale: 1,
      backgroundColor: "#666666",
      transition: {
        backgroundColor: { duration: 0.3 }
      }
    },
    success: {
      scale: 1,
      backgroundColor: "#28a745",
      transition: {
        backgroundColor: { duration: 0.3 }
      }
    },
    error: {
      scale: [1, 1.03, 0.97, 1],
      backgroundColor: "#d40000",
      transition: {
        scale: { duration: 0.4, times: [0, 0.2, 0.8, 1] },
        backgroundColor: { duration: 0.3 }
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: '0 6px 12px rgba(212, 0, 0, 0.2)'
    },
    tap: { 
      scale: 0.97 
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="contact" 
      ref={sectionRef}
      variants={fadeIn}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <motion.h2 
          className="section-heading"
          id="contact-heading"
          variants={slideUp}
        >
          Get In Touch
        </motion.h2>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            variants={slideInLeft}
            custom={1}
          >
            <motion.p 
              className="contact-intro"
              variants={slideUp}
              custom={2}
            >
              I'm currently open to new opportunities and collaborations. 
              Feel free to reach out if you have a question or just want to connect.
            </motion.p>
            
            <motion.div 
              className="contact-methods"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={info.title} 
                  className="contact-method"
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="contact-icon"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {info.icon}
                  </motion.div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        aria-label={info.ariaLabel}
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p>{info.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="social-links"
              variants={fadeIn}
              custom={3}
            >
              <h3>Connect With Me:</h3>
              <motion.div 
                className="social-icons"
                variants={staggerContainer}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={link.label} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.label}
                    variants={socialIconVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            variants={slideInRight}
            custom={1}
          >
            <motion.h3 
              variants={slideUp}
              custom={2}
            >
              Send Me a Message
            </motion.h3>
            
            {formStatus.submitted ? (
              <motion.div 
                className="form-success"
                variants={formSuccessVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: 0.2 
                  }}
                >
                  <FaCheck />
                </motion.div>
                <p>{formStatus.message}</p>
                <motion.button 
                  className="reset-form-btn" 
                  onClick={resetForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form 
                className="contact-form" 
                onSubmit={handleSubmit}
                ref={formRef}
                variants={staggerContainer}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                noValidate
              >
                <AnimatePresence>
                  {formStatus.error && (
                    <motion.div 
                      className="form-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: 'auto', 
                        transition: { duration: 0.3 }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0, 
                        transition: { duration: 0.2 }
                      }}
                      role="alert"
                    >
                      <p>{formStatus.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className={`form-group ${touched.name && getErrorMessage('name') ? 'has-error' : ''}`}
                  variants={formInputVariants}
                  custom={0}
                >
                  <label htmlFor="name">Name <span className="required">*</span></label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={nameInputRef}
                    required
                    disabled={formStatus.submitting}
                    whileFocus="focus"
                    aria-invalid={touched.name && getErrorMessage('name') ? 'true' : 'false'}
                    aria-describedby={touched.name && getErrorMessage('name') ? "name-error" : undefined}
                  />
                  {touched.name && getErrorMessage('name') && (
                    <span className="error-message" id="name-error">{getErrorMessage('name')}</span>
                  )}
                </motion.div>
                
                <motion.div 
                  className={`form-group ${touched.email && getErrorMessage('email') ? 'has-error' : ''}`}
                  variants={formInputVariants}
                  custom={1}
                >
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={formStatus.submitting}
                    whileFocus="focus"
                    aria-invalid={touched.email && getErrorMessage('email') ? 'true' : 'false'}
                    aria-describedby={touched.email && getErrorMessage('email') ? "email-error" : undefined}
                  />
                  {touched.email && getErrorMessage('email') && (
                    <span className="error-message" id="email-error">{getErrorMessage('email')}</span>
                  )}
                </motion.div>
                
                <motion.div 
                  className="form-group"
                  variants={formInputVariants}
                  custom={2}
                >
                  <label htmlFor="subject">Subject</label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                    whileFocus="focus"
                  />
                </motion.div>
                
                <motion.div 
                  className={`form-group ${touched.message && getErrorMessage('message') ? 'has-error' : ''}`}
                  variants={formInputVariants}
                  custom={3}
                >
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={formStatus.submitting}
                    whileFocus="focus"
                    aria-invalid={touched.message && getErrorMessage('message') ? 'true' : 'false'}
                    aria-describedby={touched.message && getErrorMessage('message') ? "message-error" : undefined}
                  ></motion.textarea>
                  {touched.message && getErrorMessage('message') && (
                    <span className="error-message" id="message-error">{getErrorMessage('message')}</span>
                  )}
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  variants={formInputVariants}
                  custom={4}
                  whileHover={!formStatus.submitting ? "hover" : {}}
                  whileTap={!formStatus.submitting ? "tap" : {}}
                  animate={
                    formStatus.submitting 
                      ? "submitting" 
                      : formStatus.error 
                        ? "error" 
                        : "idle"
                  }
                  disabled={formStatus.submitting}
                  aria-busy={formStatus.submitting ? 'true' : 'false'}
                >
                  <span className="submit-btn-content">
                    {formStatus.submitting ? (
                      <>
                        <motion.span 
                          className="spinner"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          aria-hidden="true"
                        ></motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="send-icon" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;