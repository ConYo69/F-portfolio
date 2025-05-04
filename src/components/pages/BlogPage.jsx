import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blogData from '../../data/blogData';
import BlogCard from '../ui/BlogCard';
import './BlogPage.css';
import { pageTransition, fadeIn, slideUp, staggerContainer } from '../../utils/animationConfig';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all unique tags from blog posts
  const allTags = ['All', ...new Set(
    blogData.flatMap(blog => blog.tags)
  )];
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize with all blogs
    setBlogs(blogData);
  }, []);
  
  // Filter blogs based on active tag and search term
  useEffect(() => {
    let filteredBlogs = [...blogData];
    
    // Filter by tag
    if (activeTag !== 'All') {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.tags.includes(activeTag)
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.summary.toLowerCase().includes(term) ||
        blog.content.toLowerCase().includes(term) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setBlogs(filteredBlogs);
  }, [activeTag, searchTerm]);
  
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Animation variants
  const tagButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: activeTag === 'All' ? 'rgba(34, 34, 34, 1)' : 'rgba(212, 0, 0, 1)',
      color: '#ffffff',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const searchInputVariants = {
    rest: { 
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    focus: { 
      boxShadow: '0 4px 10px rgba(212, 0, 0, 0.2)',
      borderColor: 'rgba(212, 0, 0, 0.5)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="blog-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="blog-header"
        variants={fadeIn}
      >
        <div className="container">
          <motion.h1 
            className="blog-page-title"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
           WMSU - BSIT
          </motion.h1>
          <motion.p 
            className="blog-page-subtitle"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Educational Tour Blog Batch 2025
          </motion.p>
        </div>
      </motion.div>
      
      <div className="container">
        <motion.div 
          className="blog-filter-section"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="search-container"
            initial="rest"
            whileFocus="focus"
            animate="rest"
          >
            <motion.input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              variants={searchInputVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </motion.div>
          
          <motion.div 
            className="tags-container"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                className={`tag-button ${activeTag === tag ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
                variants={tagButtonVariants}
                custom={index * 0.05}
                whileHover="hover"
                whileTap="tap"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {blogs.length > 0 ? (
              <motion.div 
                className="blog-grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    delay={index * 0.1}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>No blogs found matching your criteria.</p>
                <motion.button 
                  className="reset-search-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTag('All');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogPage;