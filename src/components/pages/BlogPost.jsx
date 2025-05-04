import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import blogData from '../../data/blogData';
import { formatDate, parseMarkdown } from '../../utils/helpers';
import './BlogPost.css';
import { pageTransition, fadeIn, slideUp } from '../../utils/animationConfig';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
    
    // Set loading state
    setLoading(true);
    
    // Simulate loading for smooth transitions
    const timer = setTimeout(() => {
      // Find the current blog post
      const currentBlog = blogData.find(blog => blog.id === parseInt(id));
      
      if (currentBlog) {
        setBlog(currentBlog);
        
        // Find previous and next posts
        const currentIndex = blogData.findIndex(blog => blog.id === parseInt(id));
        setPrevPost(currentIndex > 0 ? blogData[currentIndex - 1] : null);
        setNextPost(currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null);
        
        // Find related posts based on tags
        const relatedPosts = blogData
          .filter(post => post.id !== parseInt(id) && post.tags.some(tag => currentBlog.tags.includes(tag)))
          .slice(0, 3);
        
        setRelatedPosts(relatedPosts);
        setLoading(false);
      } else {
        // Redirect to blog page if post not found
        navigate('/blog');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="blog-post-page"
        key={id}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div 
          className="blog-post-header"
          variants={fadeIn}
        >
          <div className="container">
            <motion.div 
              className="blog-post-meta"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <motion.div 
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/blog" className="back-to-blog">
                  <FaArrowLeft /> Back to Blog
                </Link>
              </motion.div>
              <div className="post-meta-details">
                <motion.div 
                  className="post-date"
                  variants={slideUp}
                  custom={1}
                >
                  <FaCalendarAlt />
                  <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                </motion.div>
                <motion.div 
                  className="post-tags"
                  variants={slideUp}
                  custom={2}
                >
                  <FaTag />
                  <motion.div 
                    className="tags-list"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.2
                        }
                      }
                    }}
                  >
                    {blog.tags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="post-tag"
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.3 }
                          }
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          scale: 1.05 
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="blog-post-title"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              {blog.title}
            </motion.h1>
          </div>
        </motion.div>
        
        <div className="container blog-post-container">
          <motion.article 
            className="blog-post-content"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </motion.article>
          
          <motion.div 
            className="post-navigation"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <div className="post-nav-links">
              {prevPost && (
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/blog/${prevPost.id}`} className="prev-post">
                    <span className="nav-label">
                      <FaArrowLeft /> Previous
                    </span>
                    <span className="nav-title">{prevPost.title}</span>
                  </Link>
                </motion.div>
              )}
              
              {nextPost && (
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/blog/${nextPost.id}`} className="next-post">
                    <span className="nav-label">
                      Next <FaArrowRight />
                    </span>
                    <span className="nav-title">{nextPost.title}</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {relatedPosts.length > 0 && (
            <motion.div 
              className="related-posts"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <motion.h2
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                Related Posts
              </motion.h2>
              <motion.div 
                className="related-posts-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                {relatedPosts.map(post => (
                  <motion.div
                    key={post.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5 }
                      }
                    }}
                  > 
                    <Link 
                      to={`/blog/${post.id}`}
                      className="related-post"
                    >
                      <motion.div 
                        className="related-post-image"
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <img src={post.coverImage} alt={post.title} />
                      </motion.div>
                      <h3>{post.title}</h3>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;