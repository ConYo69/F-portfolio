import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import BlogPage from './components/pages/BlogPage'
import BlogPost from './components/pages/BlogPost'

function App() {
  const location = useLocation();
  
  // Announce route changes for screen readers
  useEffect(() => {
    // Create or get the live region element
    let announcer = document.getElementById('route-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'route-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    // Get page title based on location
    let pageTitle = 'Home';
    if (location.pathname.startsWith('/blog')) {
      pageTitle = location.pathname === '/blog' ? 'Blog' : 'Blog Post';
    }
    
    // Announce the page change
    announcer.textContent = `Navigated to ${pageTitle} page`;
    
    // Clean up function
    return () => {
      // Optional: remove announcer if needed
      // document.body.removeChild(announcer);
    };
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App