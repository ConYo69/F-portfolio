import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaCode, FaServer, FaDatabase, FaGit, FaDesktop, FaGraduationCap, FaBuilding } from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './About.css';
import { fadeIn, slideUp, scaleUp, slideInLeft, slideInRight } from '../../utils/animationConfig';

const About = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' or 'education'
  const [skillsVisible, setSkillsVisible] = useState(false);

  // Show skills animation when tab becomes visible
  useEffect(() => {
    if (isVisible && activeTab === 'skills') {
      setSkillsVisible(true);
    }
  }, [isVisible, activeTab]);

  const skills = [
    { name: 'HTML/CSS', level: 85, icon: <FaCode /> },
    { name: 'JavaScript', level: 60, icon: <FaCode /> },
    { name: 'React', level: 70, icon: <FaCode /> },
    { name: 'Node.js', level: 75, icon: <FaServer /> },
    { name: 'MongoDB', level: 70, icon: <FaDatabase /> },
    { name: 'Git', level: 85, icon: <FaGit /> },
    { name: 'Responsive Design', level: 80, icon: <FaDesktop /> },
    { name: 'UI/UX Basics', level: 75, icon: <FaDesktop /> }
  ];

  const education = [
    { 
      degree: 'BS in Information Technology',
      institution: 'Western Mindanao State University',
      year: '2021 - 2025',
      description: 'Focused on web development and software engineering principles with an emphasis on modern development practices and technologies.'
    },
    { 
      degree: 'Web Development Bootcamp',
      institution: 'codecademy',
      year: '2021-2025',
      description: 'Intensive training in modern web technologies and frameworks, including React, Node.js, and responsive design principles.'
    },
    { 
      degree: 'UI/UX Design Certificate',
      institution: 'Design Institute',
      year: '2023',
      description: 'Learned principles of user interface and experience design, focusing on creating intuitive and engaging digital experiences.'
    }
  ];

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 }
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
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      y: -3,
      opacity: 1,
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
        duration: 0.6,
        ease: 'easeOut'
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
  
  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const educationItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      x: 5,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const downloadButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 15px 30px rgba(212, 0, 0, 0.2)",
      transition: { duration: 0.4 }
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              } : { opacity: 0, scale: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.img 
                src="/profile.jpg" 
                alt="William - Software Developer" 
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
              I'm a <strong>passionate Software Developer</strong> with a focus on creating responsive and user-friendly web applications. With experience in both front-end and back-end technologies, I enjoy bringing ideas to life through clean, efficient code.
            </motion.p>
            <motion.p variants={slideUp} custom={4}>
              My journey in software development began during my studies, and I've been continuously learning and improving my skills ever since. I enjoy tackling complex problems and crafting elegant solutions that deliver exceptional user experiences.
            </motion.p>
            <motion.p variants={slideUp} custom={5}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, and sharing my knowledge with the development community. I'm always open to new challenges and opportunities to grow.
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
                  Technical Skills
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
                <AnimatePresence mode="wait">
                  {activeTab === 'skills' && (
                    <motion.div 
                      id="skills-content"
                      className="skills-container"
                      key="skills"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {skills.map((skill, index) => (
                        <motion.div 
                          key={skill.name} 
                          className="skill"
                          custom={index}
                          variants={skillItemVariants}
                          whileHover="hover"
                        >
                          <div className="skill-header">
                            <div className="skill-name">
                              <span className="skill-name-icon">{skill.icon}</span>
                              {skill.name}
                            </div>
                            <div className="skill-percentage">{skill.level}%</div>
                          </div>
                          <div className="skill-bar">
                            <motion.div 
                              className="skill-level"
                              variants={skillVariants}
                              initial="hidden"
                              animate={skillsVisible ? "visible" : "hidden"}
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
                      key="education"
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
                          whileHover="hover"
                        >
                          <div className="education-timeline">
                            <div className="education-dot"></div>
                            <div className="education-line"></div>
                          </div>
                          <div className="education-content">
                            <h4 className="education-degree">{item.degree}</h4>
                            <div className="education-details">
                              <span className="education-institution">
                                <FaBuilding className="institution-icon" aria-hidden="true" />
                                {item.institution}
                              </span>
                              <span className="education-year">
                                <FaGraduationCap aria-hidden="true" /> {item.year}
                              </span>
                            </div>
                            <p className="education-description">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;