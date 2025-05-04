import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import { navItemVariant, mobileMenuVariant, staggerContainer } from '../../utils/animationConfig';

const Navbar = ({ isOpen, toggleMenu, isMobile }) => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' }
  ];
  
  const location = useLocation();
  const navbarRef = useRef(null);
  
  // Handle focus trap for accessibility in mobile menu
  useEffect(() => {
    if (isMobile && isOpen && navbarRef.current) {
      const focusableElements = navbarRef.current.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          
          // Close menu on Escape key
          if (e.key === 'Escape') {
            toggleMenu();
          }
        };
        
        // Focus first element when menu opens
        setTimeout(() => firstElement.focus(), 100);
        
        // Add event listener for keyboard navigation
        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
      }
    }
  }, [isMobile, isOpen, toggleMenu]);

  const handleClickHash = (e) => {
    const hash = e.target.hash;
    if (hash) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjusted for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        if (isMobile && isOpen) {
          toggleMenu();
        }
        
        // Update URL without reload
        window.history.pushState(null, '', hash);
      }
    }
  };

  // Determine if a nav link is active for hash links
  const isHashActive = (path) => {
    if (!path.includes('#')) return false;
    const hash = path.split('#')[1];
    return location.pathname === '/' && location.hash === `#${hash}`;
  };

  // Mobile menu animation variants
  const navbarVariants = {
    open: mobileMenuVariant.open,
    closed: mobileMenuVariant.closed
  };

  // Desktop links animation
  const desktopNavVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.nav 
        className={`navbar ${isOpen ? 'open' : ''}`}
        id="mobile-menu"
        ref={navbarRef}
        variants={isMobile ? navbarVariants : {}}
        initial={isMobile ? "closed" : false}
        animate={isMobile ? (isOpen ? "open" : "closed") : false}
        // Fixed: Only set aria-hidden when closed and mobile
        aria-hidden={isMobile && !isOpen ? true : undefined}
      >
        <motion.ul 
          className="nav-list"
          variants={isMobile ? staggerContainer : desktopNavVariants}
          initial="hidden"
          animate="visible"
          role="menu"
        >
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.name} 
              className="nav-item"
              variants={navItemVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              custom={index}
              role="menuitem"
              // Fixed: When menu is closed, remove from tab order
              tabIndex={isMobile && !isOpen ? -1 : 0}
            >
              {link.path.includes('#') ? (
                <a 
                  href={link.path} 
                  className={`nav-link ${isHashActive(link.path) ? 'active' : ''}`}
                  onClick={handleClickHash}
                  aria-current={isHashActive(link.path) ? 'page' : undefined}
                  // Fixed: When menu is closed, remove from tab order
                  tabIndex={isMobile && !isOpen ? -1 : 0}
                >
                  <span className="nav-text">{link.name}</span>
                  <span className="nav-indicator"></span>
                </a>
              ) : (
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  onClick={isMobile && isOpen ? toggleMenu : null}
                  end={link.path === '/'}
                  // Fixed: When menu is closed, remove from tab order
                  tabIndex={isMobile && !isOpen ? -1 : 0}
                >
                  <span className="nav-text">{link.name}</span>
                  <span className="nav-indicator"></span>
                </NavLink>
              )}
            </motion.li>
          ))}
        </motion.ul>
        
        {isMobile && (
          <button 
            className="close-menu-btn"
            onClick={toggleMenu}
            aria-label="Close menu"
            // Fixed: When menu is closed, remove from tab order
            tabIndex={isMobile && !isOpen ? -1 : 0}
          >
            <span>Close</span>
          </button>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;