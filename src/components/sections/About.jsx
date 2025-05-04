import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './About.css';
import { fadeIn, slideUp, scaleUp, slideInLeft, slideInRight } from '../../utils/animationConfig';

const About = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' or 'education'

  const skills = [
    { name: 'HTML/CSS', level: 85 },
    { name: 'JavaScript', level: 60 },
    { name: 'React', level: 70 },
    { name: 'Node.js', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'Git', level: 85 },
    { name: 'Responsive Design', level: 80 },
    { name: 'UI/UX Basics', level: 75 }
  ];

  const education = [
    { 
      degree: 'BS in Information Technology',
      institution: 'Western Mindanao State University',
      year: '2021 - 2025',
      description: 'Focused on web development and software engineering principles.'
    },
    { 
      degree: 'Web Development Bootcamp',
      institution: 'codecademy',
      year: '2021-2025',
      description: 'Intensive training in modern web technologies and frameworks.'
    },
    { 
      degree: 'UI/UX Design Certificate',
      institution: 'Design Institute',
      year: '2023',
      description: 'Learned principles of user interface and experience design.'
    }
  ];

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: 'easeOut' }
    })
  };
  
  const tabVariants = {
    inactive: {
      color: 'var(--dark-color)',
      opacity: 0.7,
      y: 0
    },
    active: {
      color: 'var(--secondary-color)',
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
    }
  };
  
  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      height: 0 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      height: 'auto',
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const educationItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.4
      }
    })
  };

  const downloadButtonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 6px 12px rgba(212, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.section 
      id="about" 
      className="about" 
      ref={sectionRef}
      variants={fadeIn}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <motion.h2 
          className="section-heading"
          id="about-heading"
          variants={slideUp}
          custom={0}
        >
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div 
            className="about-image"
            variants={slideInLeft}
            custom={1}
          >
            <motion.div 
              className="profile-image-container"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="/profile.jpg" 
                alt="Profile" 
                className="profile-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
            </motion.div>
            
            <motion.a 
              href="/WilliamCV.pdf" 
              className="download-cv-btn"
              download
              variants={downloadButtonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Download CV"
            >
              <FaDownload className="download-icon" aria-hidden="true" />
              <span>Download CV</span>
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="about-text"
            variants={slideInRight}
            custom={1}
          >
            <motion.h3 variants={slideUp} custom={2}>Who Am I?</motion.h3>
            <motion.p variants={slideUp} custom={3}>
              I'm a passionate Software Developer with a focus on creating responsive and user-friendly web applications. With experience in both front-end and back-end technologies, I enjoy bringing ideas to life through code.
            </motion.p>
            <motion.p variants={slideUp} custom={4}>
              My journey in software development began during my studies, and I've been continuously learning and improving my skills ever since. I enjoy solving complex problems and creating elegant solutions.
            </motion.p>
            <motion.p variants={slideUp} custom={5}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.
            </motion.p>
            
            <motion.div 
              className="about-tabs"
              variants={fadeIn}
              custom={6}
            >
              <div className="tab-buttons">
                <motion.button
                  className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === 'skills' ? 'active' : 'inactive'}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={activeTab === 'skills'}
                  aria-controls="skills-content"
                >
                  Skills
                </motion.button>
                <motion.button
                  className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveTab('education')}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === 'education' ? 'active' : 'inactive'}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={activeTab === 'education'}
                  aria-controls="education-content"
                >
                  Education
                </motion.button>
              </div>
              
              <div className="tab-content-container">
                {activeTab === 'skills' && (
                  <motion.div 
                    id="skills-content"
                    className="skills-container"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={skill.name} 
                        className="skill"
                        variants={fadeIn}
                        custom={index}
                      >
                        <div className="skill-header">
                          <div className="skill-name">{skill.name}</div>
                          <div className="skill-percentage">{skill.level}%</div>
                        </div>
                        <div className="skill-bar">
                          <motion.div 
                            className="skill-level"
                            variants={skillVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            custom={skill.level}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {activeTab === 'education' && (
                  <motion.div 
                    id="education-content"
                    className="education-container"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {education.map((item, index) => (
                      <motion.div 
                        key={item.degree} 
                        className="education-item"
                        variants={educationItemVariants}
                        custom={index}
                      >
                        <div className="education-timeline">
                          <div className="education-dot"></div>
                          <div className="education-line"></div>
                        </div>
                        <div className="education-content">
                          <h4 className="education-degree">{item.degree}</h4>
                          <div className="education-details">
                            <span className="education-institution">{item.institution}</span>
                            <span className="education-year">{item.year}</span>
                          </div>
                          <p className="education-description">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;