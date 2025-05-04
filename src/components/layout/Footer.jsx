import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaHeart, 
  FaArrowUp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaPaperPlane 
} from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check scroll position on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/ConYo69', ariaLabel: 'Visit my GitHub profile' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/william-bryan-santinlo-7b5395361', ariaLabel: 'Connect with me on LinkedIn' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://x.com/Conqwerty1', ariaLabel: 'Follow me on Twitter' },
    { name: 'Email', icon: <FaEnvelope />, url: 'mailto:santinlowilliambryan@gmail.com', ariaLabel: 'Send me an email' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/', ariaLabel: 'Go to homepage' },
    { name: 'About', path: '/#about', ariaLabel: 'Learn about me' },
    { name: 'Experience', path: '/#experience', ariaLabel: 'View my experience' },
    { name: 'Projects', path: '/#projects', ariaLabel: 'See my projects' },
    { name: 'Blog', path: '/blog', ariaLabel: 'Read my blog' },
    { name: 'Contact', path: '/#contact', ariaLabel: 'Contact me' }
  ];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    })
  };
  
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      y: -8,
      scale: 1.1,
      transition: { 
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };
  
  const scrollButtonVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      transition: { 
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };
  
  const linkItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({ 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      x: 5,
      color: "var(--secondary-color-light)",
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <motion.footer 
      className="footer"
      ref={footerRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        variants={scrollButtonVariants}
        initial="hidden"
        animate={showScrollTop ? "visible" : "hidden"}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowUp className="scroll-to-top-icon" />
      </motion.button>
      
      <div className="container footer-container">
        <motion.div 
          className="footer-grid"
          variants={containerVariants}
        >
          <motion.div 
            className="footer-about"
            variants={itemVariants}
            custom={0}
          >
            <h3 className="footer-heading">WillCraft</h3>
            <p>A showcase of my skills, projects, and experience as a software developer. I specialize in creating responsive and user-friendly web applications that deliver exceptional experiences. Feel free to reach out for collaboration or opportunities.</p>
            <div className="social-icons">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  className="social-icon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  variants={socialIconVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="footer-links"
            variants={itemVariants}
            custom={1}
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-nav">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={linkItemVariants}
                  custom={index}
                  whileHover="hover"
                >
                  {link.path.includes('#') ? (
                    <a 
                      href={link.path}
                      aria-label={link.ariaLabel}
                      onClick={(e) => {
                        if (link.path.includes('#')) {
                          e.preventDefault();
                          const targetId = link.path.split('#')[1];
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            window.history.pushState(null, '', link.path);
                          }
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} aria-label={link.ariaLabel}>
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-contact"
            variants={itemVariants}
            custom={2}
          >
            <h3 className="footer-heading">Contact</h3>
            <motion.div
              className="footer-contact-items"
              variants={containerVariants}
            >
              <motion.p 
                variants={itemVariants}
                custom={0}
                whileHover={{ x: 5 }}
              >
                <span>Email:</span> 
                <a href="mailto:santinlowilliambryan@gmail.com">santinlowilliambryan@gmail.com</a>
              </motion.p>
              <motion.p
                variants={itemVariants}
                custom={1}
                whileHover={{ x: 5 }}
              >
                <span>Phone:</span> 
                <a href="tel:+639157630988">+63 915 763 0988</a>
              </motion.p>
              <motion.p 
                variants={itemVariants}
                custom={2}
                whileHover={{ x: 5 }}
              >
                <span>Location:</span> Feliciano Drive, San Roque, Zamboanga City, 7000, Philippines
              </motion.p>
              <motion.p 
                variants={itemVariants}
                custom={3}
                whileHover={{ x: 5 }}
              >
                <span>Availability:</span> Open to remote positions where I can contribute effectively in a virtual environment.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="newsletter"
              variants={itemVariants}
              custom={4}
            >
              <h4>Stay Updated</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  aria-label="Subscribe to newsletter with email"
                  required
                />
                <motion.button 
                  type="submit" 
                  aria-label="Subscribe"
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane style={{ marginRight: '8px' }} /> Subscribe
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
          custom={5}
        >
          <p>&copy; {currentYear} WillCraft. All rights reserved.</p>
          <p>
            Designed and built with <FaHeart className="heart-icon" aria-hidden="true" /> using React & Vite
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;