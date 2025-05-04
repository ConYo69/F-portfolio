import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaFilter, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import blogData from '../../data/blogData';
import BlogCard from '../ui/BlogCard';
import DocumentHead from '../shared/DocumentHead';
import './BlogPage.css';
import { pageTransition, fadeIn, slideUp, staggerContainer } from '../../utils/animationConfig';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchInputRef = useRef(null);
  const filtersRef = useRef(null);
  
  // Get all unique tags from blog posts
  const allTags = ['All', ...new Set(
    blogData.flatMap(blog => blog.tags)
  )];
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate loading for smooth transitions
    const timer = setTimeout(() => {
      setBlogs(blogData);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle click outside filters menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setFiltersOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    setFiltersOpen(false); // Close filters dropdown on mobile after selection
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  const resetFilters = () => {
    setActiveTag('All');
    setSearchTerm('');
  };
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Animation variants
  const tagButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05 + 0.3,
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: { 
      scale: 1.05,
      backgroundColor: activeTag === 'All' ? 'rgba(34, 34, 34, 1)' : 'rgba(212, 0, 0, 1)',
      color: '#ffffff',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const searchContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
    },
    focus: {
      scale: 1.02,
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(212, 0, 0, 0.3)',
      transition: { duration: 0.3 }
    }
  };
  
  const searchIconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, color: 'var(--secondary-color)' },
    focus: { scale: 1.1, rotate: 5, color: 'var(--secondary-color)' }
  };
  
  const clearButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };
  
  const filterButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.4,
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: 'rgba(212, 0, 0, 0.1)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };
  
  const filtersDropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const blogContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
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
      <DocumentHead 
        title="Blog - Educational Tour Batch 2025 | WillCraft"
        description="Read about our educational tour experiences and insights."
        ogTitle="WMSU-BSIT Educational Tour Blog"
        ogDescription="Read about our educational tour experiences and insights."
      />
    
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
            variants={searchContainerVariants}
            initial="hidden"
            animate="visible"
            whileHover={!isSearchFocused ? "hover" : "focus"}
            whileFocus="focus"
          >
            <motion.div
              className="search-icon"
              variants={searchIconVariants}
              initial="rest"
              animate={isSearchFocused ? "focus" : "rest"}
              whileHover="hover"
            >
              <FaSearch aria-hidden="true" />
            </motion.div>
            
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              ref={searchInputRef}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search blogs"
            />
            
            <AnimatePresence>
              {searchTerm && (
                <motion.button 
                  className="clear-search-btn"
                  onClick={clearSearch}
                  variants={clearButtonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Clear search"
                >
                  <FaTimes aria-hidden="true" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          
          <div className="blog-toolbar">
            <motion.div
              className="filters-container"
              ref={filtersRef}
            >
              <motion.button 
                className={`filter-toggle-btn ${filtersOpen ? 'active' : ''}`}
                onClick={toggleFilters}
                variants={filterButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                aria-expanded={filtersOpen}
                aria-controls="filters-dropdown"
              >
                <FaFilter aria-hidden="true" />
                <span>Filter by Tag</span>
                <span className="active-filter">{activeTag !== 'All' ? activeTag : ''}</span>
              </motion.button>
              
              <AnimatePresence>
                {filtersOpen && (
                  <motion.div 
                    id="filters-dropdown"
                    className="filters-dropdown"
                    variants={filtersDropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="dropdown-header">
                      <h3>Filter by Tag</h3>
                      <button 
                        onClick={() => setFiltersOpen(false)}
                        aria-label="Close filters"
                        className="close-dropdown-btn"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
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
                          custom={index}
                          whileHover="hover"
                          whileTap="tap"
                          aria-pressed={activeTag === tag}
                        >
                          <FaTag className="tag-icon" aria-hidden="true" />
                          {tag}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className="blog-meta-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="meta-item">
                <FaCalendarAlt aria-hidden="true" />
                <span>April 2025</span>
              </span>
              <span className="meta-item">
                <FaClock aria-hidden="true" />
                <span>{blogData.length} posts</span>
              </span>
            </motion.div>
          </div>
          
          {/* Desktop Tags (always visible on larger screens) */}
          <motion.div 
            className="desktop-tags-container"
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
                custom={index}
                whileHover="hover"
                whileTap="tap"
                aria-pressed={activeTag === tag}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              className="loading-container"
              key="loading"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="spinner"></div>
              <p>Loading blogs...</p>
            </motion.div>
          ) : (
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
                  variants={blogContainerVariants}
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
                  <div className="no-results-icon">
                    <FaSearch aria-hidden="true" />
                  </div>
                  <h3>No blogs found</h3>
                  <p>
                    {searchTerm 
                      ? `No blogs found matching "${searchTerm}"${activeTag !== 'All' ? ` with tag "${activeTag}"` : ''}.` 
                      : `No blogs found with tag "${activeTag}".`}
                  </p>
                  <motion.button 
                    className="reset-search-btn"
                    onClick={resetFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogPage;