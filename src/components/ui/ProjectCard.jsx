import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ProjectCard.css';
import { cardVariant, hoverScale } from '../../utils/animationConfig';

const ProjectCard = ({ project, isVisible, delay }) => {
  // Animation variants
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    hover: {
      opacity: 1,
      backdropFilter: 'blur(2px)',
      transition: { duration: 0.3 }
    }
  };

  const linkVariants = {
    initial: {
      y: 20,
      opacity: 0
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const techTagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const featuredBadgeVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <motion.div 
      className="project-card"
      variants={cardVariant}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      custom={delay}
      viewport={{ once: true, amount: 0.25 }}
      whileHover="hover"
    >
      <motion.div 
        className="project-card-inner"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="project-image">
          <motion.img 
            src={project.image} 
            alt={`Screenshot of ${project.title} project`}
            loading="lazy"
            variants={imageVariants}
          />
          <motion.div 
            className="project-overlay"
            variants={overlayVariants}
            initial="initial"
            aria-hidden="true"
          >
            <motion.div 
              className="project-links"
              variants={linkVariants}
            >
              <motion.a 
                href={project.repoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
                whileHover={hoverScale}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} code on GitHub`}
              >
                <FaGithub aria-hidden="true" />
                <span>Code</span>
              </motion.a>
              <motion.a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
                whileHover={hoverScale}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} live demo`}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                <span>Demo</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          
          <motion.div 
            className="project-technologies"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {project.technologies.map((tech, index) => (
              <motion.span 
                key={index} 
                className="project-tech-tag"
                variants={techTagVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  backgroundColor: 'rgba(212, 0, 0, 0.2)',
                  scale: 1.05,
                  y: -2
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          
          <div className="project-actions">
            <a 
              href={project.repoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-action-link"
              aria-label={`View ${project.title} code on GitHub`}
            >
              <FaGithub aria-hidden="true" />
              <span>Repository</span>
            </a>
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-action-link"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </motion.div>
      
      {project.featured && (
        <motion.div 
          className="featured-badge"
          variants={featuredBadgeVariants}
          initial="initial"
          animate="animate"
          aria-label="Featured project"
        >
          Featured
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;