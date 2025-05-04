import React, { useEffect } from 'react';
import DocumentHead from '../shared/DocumentHead';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (location.hash) {
      // Slight delay to ensure components are mounted
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const headerOffset = 80; // Adjust based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <DocumentHead 
        title="WillCraft"
        description="Professional developer portfolio showcasing my skills, projects, and experience in web development and software engineering."
        keywords="web developer, portfolio, frontend, react, javascript"
        ogTitle="WillCraft"
        ogDescription="Professional developer portfolio showcasing my skills, projects, and experience in web development and software engineering."
        ogType="website"
        ogUrl="https://your-portfolio-domain.com"
        ogImage="/images/og-image.jpg"
        canonicalUrl="https://your-portfolio-domain.com"
      />
      
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default HomePage;