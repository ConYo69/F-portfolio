import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import projectData from '../../data/projectData';
import ProjectCard from '../ui/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
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
        duration: 0.4,
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };
  
  // No results animation variants
  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
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
              whileHover="hover"
              whileTap="tap"
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
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16L14 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>No Projects Found</h3>
                <p>No projects matching the "{filter}" filter were found.</p>
                <motion.button 
                  className="reset-filter-btn"
                  onClick={() => setFilter('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Projects
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="projects-footer"
          variants={fadeIn}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <p>Want to see more? Check out my GitHub repositories.</p>
          <motion.a 
            href="https://github.com/ConYo69?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="View more projects on GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View More Projects
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;