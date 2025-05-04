import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import { navItemVariant } from '../../utils/animationConfig';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' }
  ];

  // Handle scroll event to change header style with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
  }, []);

  // Handle window resize with debouncing
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setMenuOpen(false);
      document.body.classList.remove('no-scroll');
    }
  }, []);

  useEffect(() => {
    // Set up initial state
    handleScroll();
    handleResize();
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Debounce resize event
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [handleScroll, handleResize]);

  // Close mobile menu when changing routes
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.classList.remove('no-scroll');
    }
  }, [location, menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open on mobile
    if (!menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };
  
  // Handle hash link clicks - fixed to work from any page
  const handleClickHash = (e) => {
    e.preventDefault();
    const hash = e.target.hash;
    
    // Close mobile menu after clicking
    if (menuOpen) {
      toggleMenu();
    }

    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without reload
        window.history.pushState(null, '', hash);
      }
    } else {
      // If we're on another page, navigate to home page with the hash
      navigate('/' + hash);
    }
  };

  // Determine if a nav link is active
  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      return location.pathname === '/' && location.hash === `#${hash}`;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container header-container">
        <motion.div 
          className="logo"
          variants={navItemVariant}
          initial="hidden"
          animate="visible"
        >
          <Link to="/" aria-label="DevPortfolio Homepage">
            <span className="logo-text">WillCraft</span>
          </Link>
        </motion.div>
        
        {/* Mobile Toggle Button */}
        <button 
          className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="navigation"
          aria-haspopup="true"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        {/* Main Navigation */}
        <nav 
          id="navigation" 
          className={`navigation ${menuOpen ? 'open' : ''}`}
          inert={isMobile && !menuOpen ? "" : undefined}
        >
          <ul className="nav-list">
            {navLinks.map((link, index) => (
              <li key={link.name} className="nav-item">
                {link.path.includes('#') ? (
                  <a 
                    href={link.path}
                    className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    onClick={handleClickHash}
                    aria-current={isLinkActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path}
                    className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    aria-current={isLinkActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Only show close button in mobile menu */}
          {isMobile && (
            <button 
              className="close-menu-btn"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              Close
            </button>
          )}
        </nav>
        
        {/* Backdrop for mobile menu */}
        {menuOpen && isMobile && (
          <div 
            className="menu-backdrop"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;