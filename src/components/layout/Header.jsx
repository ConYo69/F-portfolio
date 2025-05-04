import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  }, [location.pathname, location.hash]);

  // Toggle menu
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };
  
  // Handle hash link clicks
  const handleClickHash = (e) => {
    e.preventDefault();
    const hash = e.currentTarget.hash;
    
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');

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
      return location.hash === `#${hash}`;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">WillCraft</span>
          </Link>
        </div>
        
        {/* Mobile Toggle Button */}
        <button 
          className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        {/* Main Navigation */}
        <div className={`navigation ${menuOpen ? 'open' : ''}`} id="navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                {link.path.includes('#') ? (
                  <a 
                    href={link.path}
                    className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    onClick={handleClickHash}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path}
                    className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Close button */}
          <button 
            className="close-menu-btn"
            onClick={toggleMenu}
          >
            Close
          </button>
        </div>
        
        {/* Backdrop */}
        {menuOpen && (
          <div 
            className="menu-backdrop" 
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;