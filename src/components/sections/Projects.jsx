import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import projectData from '../../data/projectData';
import ProjectCard from '../ui/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaSearch, FaTimesCircle } from 'react-icons/fa';
import './Projects.css';
import { fadeIn, slideUp, cardGridVariant } from '../../utils/animationConfig';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
  const filterContainerRef = useRef(null);

  // Get unique technologies across all projects
  const allTechnologies = ['all', ...new Set(
    projectData.flatMap(project => project.technologies)
  )];

  // Filter projects based on selected technology
  useEffect(() => {
    // Add a slight delay to create a smooth transition effect
    const filterTimer = setTimeout(() => {
      const filtered = filter === 'all'
        ? projectData
        : projectData.filter(project => project.technologies.includes(filter));
      
      setFilteredProjects(filtered);
    }, 100);
    
    return () => clearTimeout(filterTimer);
  }, [filter]);

  // Scroll active filter button into view on mobile
  useEffect(() => {
    if (filterContainerRef.current && window.innerWidth <= 768) {
      const activeButton = filterContainerRef.current.querySelector('.filter-button.active');
      if (activeButton) {
        // Scroll the active button into view with a small offset
        const containerWidth = filterContainerRef.current.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;
        
        filterContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [filter]);

  // Filter button animation variants
  const filterButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      y: -3,
      boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    },
    active: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--secondary-color)',
      color: 'var(--light-color)',
      y: -3,
      boxShadow: '0 6px 12px rgba(212, 0, 0, 0.2)'
    }
  };
  
  // No results animation variants
  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1] 
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6, 
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="projects" 
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeIn}
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <motion.h2 
          className="section-heading"
          id="projects-heading"
          variants={slideUp}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="filter-container"
          ref={filterContainerRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          aria-label="Filter projects by technology"
          role="tablist"
        >
          {allTechnologies.map((tech, index) => (
            <motion.button
              key={tech}
              id={`filter-${tech}`}
              className={`filter-button ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
              custom={index}
              variants={filterButtonVariants}
              whileHover={filter !== tech ? "hover" : {}}
              whileTap="tap"
              animate={filter === tech ? "active" : "visible"}
              role="tab"
              aria-selected={filter === tech}
              aria-controls="projects-grid"
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            id="projects-grid"
            className="projects-grid"
            variants={cardGridVariant}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            aria-live="polite"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  isVisible={isVisible}
                  delay={index * 0.1}
                />
              ))
            ) : (
              <motion.div 
                className="no-results"
                variants={noResultsVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="no-results-icon">
                  <FaSearch />
                </div>
                <h3>No Projects Found</h3>
                <p>No projects matching the "{filter}" filter were found.</p>
                <motion.button 
                  className="reset-filter-btn"
                  onClick={() => setFilter('all')}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimesCircle style={{ marginRight: '8px' }} />
                  Show All Projects
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="projects-footer"
          variants={footerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <p>Want to see more of my work? Check out my GitHub repositories for additional projects.</p>
          <motion.a 
            href="https://github.com/ConYo69?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            whileHover={{ 
              scale: 1.05, 
              y: -5, 
              boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="View more projects on GitHub"
          >
            <FaGithub className="github-icon" aria-hidden="true" style={{ marginRight: '8px' }} />
            Explore More Projects
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;