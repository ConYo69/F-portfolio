import React from 'react';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';
import { slideUp, fadeIn, staggerContainer } from '../../utils/animationConfig';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without reload
      window.history.pushState(null, '', '#about');
    }
  };

  // Animation variants for staggered animations
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const socialContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  };

  const socialItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      className="hero"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      id="home"
    >
      <div className="hero-bg">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>

      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="hero-title"
            variants={titleContainer}
          >
            <motion.span 
              className="hero-greeting"
              variants={slideUp}
            >
              Hello, I'm
            </motion.span>
            <motion.span 
              className="hero-name"
              variants={slideUp}
            >
              William
            </motion.span>
            <motion.span 
              className="hero-role"
              variants={slideUp}
            >
              <span className="typed-text">a Software Developer</span>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            variants={slideUp}
          >
            I build responsive, user-friendly web applications with a focus on performance and clean code.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={slideUp}
          >
            <motion.a 
              href="#projects" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(212, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                  window.scrollTo({
                    top: projectsSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                  window.history.pushState(null, '', '#projects');
                }
              }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                  window.history.pushState(null, '', '#contact');
                }
              }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div 
            className="social-links-hero"
            variants={socialContainer}
          >
            <motion.a 
              href="https://github.com/ConYo69" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              variants={socialItemVariant}
              whileHover={{ y: -5, color: "#d40000", scale: 1.1 }}
              className="social-link"
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/william-bryan-santinlo-7b5395361" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              variants={socialItemVariant}
              whileHover={{ y: -5, color: "#d40000", scale: 1.1 }}
              className="social-link"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="https://x.com/Conqwerty1" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              variants={socialItemVariant}
              whileHover={{ y: -5, color: "#d40000", scale: 1.1 }}
              className="social-link"
            >
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator" 
          onClick={scrollToAbout}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToAbout();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Scroll down to About section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <span>Scroll Down</span>
          <FaArrowDown className="bounce" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;