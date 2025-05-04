import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaTag, 
  FaArrowLeft, 
  FaArrowRight, 
  FaShare, 
  FaClock,
  FaChevronUp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPinterest
} from 'react-icons/fa';
import blogData from '../../data/blogData';
import { formatDate, parseMarkdown } from '../../utils/helpers';
import DocumentHead from '../shared/DocumentHead';
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  
  const contentRef = useRef(null);
  const shareMenuRef = useRef(null);
  
  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentTop = contentRef.current.getBoundingClientRect().top;
        setShowScrollTop(contentTop < -300);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShareMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Scroll to top when component mounts or id changes
  useEffect(() => {
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
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const toggleShareMenu = () => {
    setShareMenuOpen(!shareMenuOpen);
  };
  
  // Handle social sharing
  const handleShare = (platform) => {
    if (!blog) return;
    
    const title = encodeURIComponent(blog.title);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=500');
    setShareMenuOpen(false);
  };
  
  // Estimate reading time
  const getReadingTime = (content) => {
    if (!content) return '1 min';
    
    // Average reading speed: 200 words per minute
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    return readingTime === 1 ? '1 min' : `${readingTime} mins`;
  };

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
        {blog && (
          <DocumentHead 
            title={`${blog.title} | WMSU-BSIT Educational Tour`}
            description={blog.summary}
            ogTitle={blog.title}
            ogDescription={blog.summary}
            ogImage={blog.coverImage}
          />
        )}
        
        {blog && (
          <>
            <motion.div 
              className="blog-post-header"
              variants={fadeIn}
              style={{ 
                backgroundImage: `url(${blog.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="header-overlay"></div>
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
                      className="post-reading-time"
                      variants={slideUp}
                      custom={1}
                    >
                      <FaClock />
                      <span>{getReadingTime(blog.content)}</span>
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
                ref={contentRef}
              >
                <div className="blog-share-container" ref={shareMenuRef}>
                  <motion.button 
                    className="share-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleShareMenu}
                    aria-label="Share this article"
                    aria-expanded={shareMenuOpen}
                    aria-controls="share-menu"
                  >
                    <FaShare />
                    <span>Share</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {shareMenuOpen && (
                      <motion.div 
                        id="share-menu"
                        className="share-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button 
                          className="share-option facebook"
                          onClick={() => handleShare('facebook')}
                          aria-label="Share on Facebook"
                        >
                          <FaFacebook />
                          <span>Facebook</span>
                        </button>
                        <button 
                          className="share-option twitter"
                          onClick={() => handleShare('twitter')}
                          aria-label="Share on Twitter"
                        >
                          <FaTwitter />
                          <span>Twitter</span>
                        </button>
                        <button 
                          className="share-option linkedin"
                          onClick={() => handleShare('linkedin')}
                          aria-label="Share on LinkedIn"
                        >
                          <FaLinkedin />
                          <span>LinkedIn</span>
                        </button>
                        <button 
                          className="share-option pinterest"
                          onClick={() => handleShare('pinterest')}
                          aria-label="Share on Pinterest"
                        >
                          <FaPinterest />
                          <span>Pinterest</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                
                <div className="post-tags-footer">
                  <h4>Tags:</h4>
                  <div className="tags-list">
                    {blog.tags.map((tag, index) => (
                      <Link 
                        key={index}
                        to={`/blog?tag=${tag}`}
                        className="post-tag"
                      >
                        <FaTag className="tag-icon" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
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
                          <FaArrowLeft /> Previous Post
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
                          Next Post <FaArrowRight />
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
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.3 }
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
                            <img src={post.coverImage} alt={post.title} loading="lazy" />
                          </motion.div>
                          <h3>{post.title}</h3>
                          <div className="related-post-meta">
                            <time dateTime={post.date}>
                              <FaCalendarAlt /> {formatDate(post.date)}
                            </time>
                            <span className="reading-time">
                              <FaClock /> {getReadingTime(post.content)}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            <AnimatePresence>
              {showScrollTop && (
                <motion.button 
                  className="scroll-top-button"
                  onClick={scrollToTop}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Scroll to top"
                >
                  <FaChevronUp />
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;