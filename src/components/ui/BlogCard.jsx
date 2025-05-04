import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate, truncateText } from '../../utils/helpers';
import './BlogCard.css';
import { cardVariant, hoverScale } from '../../utils/animationConfig';

const BlogCard = ({ blog, delay = 0 }) => {
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
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
      transition: { duration: 0.3 }
    }
  };
  
  const tagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
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
      <motion.div 
        className="blog-card-inner"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/blog/${blog.id}`} className="blog-image-link">
          <motion.div className="blog-image">
            <motion.img 
              src={blog.coverImage} 
              alt={blog.title} 
              variants={imageVariants}
            />
            <motion.div 
              className="blog-overlay"
              variants={overlayVariants}
              initial="initial"
            >
              <motion.span 
                variants={buttonVariants}
                whileHover={hoverScale}
              >
                Read More
              </motion.span>
            </motion.div>
          </motion.div>
        </Link>
        
        <div className="blog-content">
          <div className="blog-meta">
            <motion.time 
              dateTime={blog.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
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
                  whileHover={{ 
                    backgroundColor: 'rgba(212, 0, 0, 0.2)',
                    scale: 1.05 
                  }}
                >
                  {tag}
                </motion.span>
              ))}
              {blog.tags.length > 2 && (
                <motion.span 
                  className="blog-tag"
                  variants={tagVariants}
                  whileHover={{ scale: 1.05 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <motion.div 
              whileHover={{ x: 5 }}
              className="read-more-container"
            >
              <Link to={`/blog/${blog.id}`} className="read-more">
              Explore
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default BlogCard;