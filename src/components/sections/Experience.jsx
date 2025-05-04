import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import experienceData from '../../data/experienceData';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBriefcase, FaGraduationCap, FaCalendarAlt, FaTools } from 'react-icons/fa';
import './Experience.css';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animationConfig';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
  const tabsContainerRef = useRef(null);
  const indicatorRef = useRef(null);
  
  // Handle tab selection and scroll active tab into view on mobile
  const handleTabClick = (index) => {
    setActiveTab(index);
    
    // Scroll indicator into view on mobile
    if (window.innerWidth <= 768 && tabsContainerRef.current) {
      const tabButtons = tabsContainerRef.current.querySelectorAll('.tab-button');
      if (tabButtons && tabButtons[index]) {
        const tabButton = tabButtons[index];
        
        // Calculate scroll position to center the tab
        const container = tabsContainerRef.current;
        const scrollLeft = tabButton.offsetLeft - (container.clientWidth / 2) + (tabButton.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Update indicator position when active tab changes
  useEffect(() => {
    if (indicatorRef.current && tabsContainerRef.current) {
      const tabButtons = tabsContainerRef.current.querySelectorAll('.tab-button');
      if (tabButtons && tabButtons[activeTab]) {
        const tabButton = tabButtons[activeTab];
        
        // Update indicator position and width
        indicatorRef.current.style.left = `${tabButton.offsetLeft}px`;
        indicatorRef.current.style.width = `${tabButton.clientWidth}px`;
      }
    }
  }, [activeTab]);
  
  // Update indicator position on resize
  useEffect(() => {
    const handleResize = () => {
      if (indicatorRef.current && tabsContainerRef.current) {
        const tabButtons = tabsContainerRef.current.querySelectorAll('.tab-button');
        if (tabButtons && tabButtons[activeTab]) {
          const tabButton = tabButtons[activeTab];
          
          // Update indicator position and width
          indicatorRef.current.style.left = `${tabButton.offsetLeft}px`;
          indicatorRef.current.style.width = `${tabButton.clientWidth}px`;
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);
  
  // Set initial indicator position after component mounts
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (indicatorRef.current && tabsContainerRef.current) {
        const tabButtons = tabsContainerRef.current.querySelectorAll('.tab-button');
        if (tabButtons && tabButtons[activeTab]) {
          const tabButton = tabButtons[activeTab];
          
          // Set initial indicator position and width
          indicatorRef.current.style.left = `${tabButton.offsetLeft}px`;
          indicatorRef.current.style.width = `${tabButton.clientWidth}px`;
          
          // Initialize with visible state if section is in viewport
          if (isVisible) {
            indicatorRef.current.style.opacity = '1';
          }
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isVisible, activeTab]);

  // Animation variants
  const tabVariants = {
    inactive: {
      opacity: 0.6,
      y: 0
    },
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      y: -2,
      opacity: 0.9,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      y: 1,
      scale: 0.98
    }
  };

  const tabPanelVariants = {
    hidden: {
      opacity: 0,
      x: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -30,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3
      }
    }
  };

  const responsibilityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.4
      }
    }),
    hover: {
      x: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  const techTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05 * custom,
        duration: 0.3
      }
    }),
    hover: {
      scale: 1.08,
      backgroundColor: 'rgba(212, 0, 0, 0.2)',
      y: -3,
      transition: {
        duration: 0.2
      }
    }
  };

  // Icon map for experience items
  const getIcon = (company) => {
    switch (company.toLowerCase()) {
      case 'capstone project & research':
        return <FaGraduationCap />;
      case 'role':
        return <FaBriefcase />;
      default:
        return <FaBriefcase />;
    }
  };

  return (
    <motion.section 
      id="experience" 
      className="experience" 
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeIn}
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <motion.h2 
          className="section-heading"
          id="experience-heading"
          variants={slideUp}
        >
          Experience
        </motion.h2>
        
        <motion.div 
          className="experience-content"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="tabs-container">
            <motion.div 
              className="tabs-header"
              ref={tabsContainerRef}
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              role="tablist"
              aria-label="Experience tabs"
            >
              {experienceData.map((job, index) => (
                <motion.button
                  key={job.id} 
                  className={`tab-button ${activeTab === index ? 'active' : ''}`}
                  onClick={() => handleTabClick(index)}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                  whileHover="hover"
                  whileTap="tap"
                  role="tab"
                  id={`tab-${index}`}
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${index}`}
                  tabIndex={activeTab === index ? 0 : -1}
                >
                  <span className="tab-icon">
                    {getIcon(job.company)}
                  </span>
                  <span className="tab-text">{job.company}</span>
                </motion.button>
              ))}
              
              <motion.div 
                className="tab-indicator"
                ref={indicatorRef}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              ></motion.div>
            </motion.div>
            
            <div className="tabs-content">
              <AnimatePresence mode="wait">
                {experienceData.map((job, index) => (
                  activeTab === index && (
                    <motion.div
                      key={job.id}
                      className="tab-panel active"
                      variants={tabPanelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      role="tabpanel"
                      id={`panel-${index}`}
                      aria-labelledby={`tab-${index}`}
                      tabIndex={0}
                    >
                      <div className="job-header">
                        <motion.div 
                          className="job-title"
                          variants={slideUp}
                          custom={0}
                        >
                          <h3>{job.role}</h3>
                          <div className="job-meta">
                            <motion.span 
                              className="job-company"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                            >
                              <FaBriefcase className="job-icon" aria-hidden="true" />
                              {job.company}
                            </motion.span>
                            
                            <motion.span 
                              className="job-duration"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                            >
                              <FaCalendarAlt className="job-icon" aria-hidden="true" />
                              {job.duration}
                            </motion.span>
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.p 
                        className="job-description"
                        variants={slideUp}
                        custom={1}
                      >
                        {job.description}
                      </motion.p>
                      
                      <motion.h4 
                        className="responsibilities-heading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        Key Responsibilities
                      </motion.h4>
                      
                      <motion.ul 
                        className="responsibilities-list"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {job.responsibilities.map((responsibility, idx) => (
                          <motion.li 
                            key={idx}
                            variants={responsibilityVariants}
                            custom={idx}
                            whileHover="hover"
                          >
                            <span className="bullet">▹</span>
                            {responsibility}
                          </motion.li>
                        ))}
                      </motion.ul>
                      
                      <motion.div 
                        className="technologies-used"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                      >
                        <motion.h4 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          <FaTools className="tech-icon" aria-hidden="true" />
                          Technologies Used
                        </motion.h4>
                        <motion.div 
                          className="tech-tags"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {job.technologies.map((tech, idx) => (
                            <motion.span 
                              key={idx} 
                              className="tech-tag"
                              variants={techTagVariants}
                              custom={idx}
                              whileHover="hover"
                            >
                              <FaCode className="tag-icon" aria-hidden="true" />
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;