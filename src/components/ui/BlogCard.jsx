import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTag, FaArrowRight, FaEye } from 'react-icons/fa';
import { formatDate, truncateText } from '../../utils/helpers';
import './BlogCard.css';
import { cardVariant, hoverScale } from '../../utils/animationConfig';

const BlogCard = ({ blog, delay = 0 }) => {
  // Animation variants specific to this component
  const imageVariants = {
    initial: {
      scale: 1
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

  const buttonVariants = {
    initial: {
      y: 20,
      opacity: 0
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };
  
  const tagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      y: -2,
      backgroundColor: 'rgba(212, 0, 0, 0.2)',
      transition: { duration: 0.2 }
    }
  };
  
  const contentVariants = {
    initial: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3 } }
  };
  
  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }
  };
  
  return (
    <motion.article 
      className="blog-card"
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      custom={delay}
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="blog-card-inner">
        <Link to={`/blog/${blog.id}`} className="blog-image-link" aria-label={`Read ${blog.title}`}>
          <motion.div className="blog-image">
            <motion.img 
              src={blog.coverImage} 
              alt="" // Decorative image, title is in link text
              loading="lazy"
              variants={imageVariants}
            />
            <motion.div 
              className="blog-overlay"
              variants={overlayVariants}
              initial="initial"
              aria-hidden="true"
            >
              <motion.div 
                className="overlay-content"
                variants={buttonVariants}
                whileHover={hoverScale}
              >
                <FaEye className="overlay-icon" />
                <span>Read Article</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </Link>
        
        <motion.div 
          className="blog-content"
          variants={contentVariants}
        >
          <div className="blog-meta">
            <motion.time 
              dateTime={blog.date}
              className="blog-date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              <FaCalendarAlt className="meta-icon" aria-hidden="true" />
              {formatDate(blog.date)}
            </motion.time>
            
            <motion.div 
              className="blog-tags"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: delay + 0.3
                  }
                }
              }}
            >
              {blog.tags.slice(0, 2).map((tag, index) => (
                <motion.span 
                  key={index} 
                  className="blog-tag"
                  variants={tagVariants}
                  whileHover="hover"
                  aria-label={`Tag: ${tag}`}
                >
                  <FaTag className="tag-icon" aria-hidden="true" />
                  {tag}
                </motion.span>
              ))}
              {blog.tags.length > 2 && (
                <motion.span 
                  className="blog-tag more-tags"
                  variants={tagVariants}
                  whileHover="hover"
                  aria-label={`${blog.tags.length - 2} more tags`}
                >
                  +{blog.tags.length - 2}
                </motion.span>
              )}
            </motion.div>
          </div>
          
          <motion.h3 
            className="blog-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
          >
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </motion.h3>
          
          <motion.p 
            className="blog-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4, duration: 0.5 }}
          >
            {truncateText(blog.summary, 120)}
          </motion.p>
          
          <motion.div
            className="read-more-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
            whileHover="hover"
          >
            <Link to={`/blog/${blog.id}`} className="read-more">
              <span>Read More</span>
              <motion.span 
                className="arrow-icon"
                variants={arrowVariants}
              >
                <FaArrowRight aria-hidden="true" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default BlogCard;