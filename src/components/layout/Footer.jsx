import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/ConYo69', ariaLabel: 'Visit my GitHub profile' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/william-bryan-santinlo-7b5395361', ariaLabel: 'Connect with me on LinkedIn' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://x.com/Conqwerty1', ariaLabel: 'Follow me on Twitter' },
    { name: 'Email', icon: <FaEnvelope />, url: 'https://mailto:santinlowilliambryan@gmail.com', ariaLabel: 'Send me an email' }
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
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: { duration: 0.2 }
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
      <div className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <FaArrowUp />
      </div>
      
      <div className="container footer-container">
        <motion.div 
          className="footer-grid"
          variants={containerVariants}
        >
          <motion.div 
            className="footer-about"
            variants={itemVariants}
          >
            <h3 className="footer-heading">WillCraft</h3>
            <p>A showcase of my skills, projects, and experience as a software developer. Feel free to reach out for collaboration or opportunities.</p>
            <div className="social-icons">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  className="social-icon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  variants={socialIconVariants}
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
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-nav">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
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
          >
            <h3 className="footer-heading">Contact</h3>
            <motion.div
              className="footer-contact-items"
              variants={containerVariants}
            >
              <motion.p 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Email:</span> 
                <a href="mailto:your.email@example.com">santinlowilliambryan@gmail.com</a>
              </motion.p>
              <motion.p 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Location:</span> Feliciano Drive, San Roque, Zamboanga City, 7000, Philippines
              </motion.p>
              <motion.p 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Open to work:</span> Open to remote positions where I can contribute effectively in a virtual environment. Kindly note that I am not available for on-site work.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="newsletter"
              variants={itemVariants}
            >
              <h4>Stay Updated</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  aria-label="Subscribe to newsletter with email"
                  required
                />
                <button type="submit" aria-label="Subscribe">Subscribe</button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
        >
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
          <p>
            Designed and built with <FaHeart className="heart-icon" aria-hidden="true" /> using React & Vite
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;