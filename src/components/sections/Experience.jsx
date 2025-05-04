import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import experienceData from '../../data/experienceData';
import './Experience.css';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animationConfig';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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

  const tabIndicatorVariants = {
    inactive: {
      width: 0,
      x: 50,
      opacity: 0
    },
    active: {
      width: '100%',
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const tabPanelVariants = {
    hidden: {
      opacity: 0,
      x: 30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -30,
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
    })
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
    })
  };

  return (
    <motion.section 
      id="experience" 
      className="experience" 
      ref={sectionRef}
      variants={fadeIn}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="container">
        <motion.h2 
          className="section-heading"
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
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {experienceData.map((job, index) => (
                <motion.div 
                  key={job.id} 
                  className="tab-button-container"
                  variants={fadeIn}
                  custom={index}
                >
                  <motion.button
                    className={`tab-button ${activeTab === index ? 'active' : ''}`}
                    onClick={() => handleTabClick(index)}
                    variants={tabVariants}
                    initial="inactive"
                    animate={activeTab === index ? "active" : "inactive"}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {job.company}
                  </motion.button>
                  <motion.div 
                    className="tab-indicator"
                    variants={tabIndicatorVariants}
                    initial="inactive"
                    animate={activeTab === index ? "active" : "inactive"}
                  />
                </motion.div>
              ))}
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
                    >
                      <motion.div 
                        className="job-title"
                        variants={slideUp}
                        custom={0}
                      >
                        <h3>{job.role}</h3>
                        <span className="job-duration">{job.duration}</span>
                      </motion.div>
                      
                      <motion.p 
                        className="job-description"
                        variants={slideUp}
                        custom={1}
                      >
                        {job.description}
                      </motion.p>
                      
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
                        <h4>Technologies Used:</h4>
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
                              whileHover={{ 
                                scale: 1.1, 
                                backgroundColor: 'rgba(212, 0, 0, 0.2)'
                              }}
                              transition={{ duration: 0.2 }}
                            >
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