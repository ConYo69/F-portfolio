import { useEffect } from 'react';

/**
 * DocumentHead component to manage document metadata without using React Helmet
 * This approach avoids the UNSAFE_componentWillMount warning
 */
const DocumentHead = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogType, 
  ogUrl, 
  ogImage,
  canonicalUrl
}) => {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }
    
    // Handle meta tags
    const updateMetaTag = (name, content) => {
      // Check if meta tag exists
      let metaTag = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      // If it exists, update it
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        // Otherwise create it
        metaTag = document.createElement('meta');
        if (name.startsWith('og:')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    // Update meta tags based on props
    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (ogTitle) updateMetaTag('og:title', ogTitle);
    if (ogDescription) updateMetaTag('og:description', ogDescription);
    if (ogType) updateMetaTag('og:type', ogType);
    if (ogUrl) updateMetaTag('og:url', ogUrl);
    if (ogImage) updateMetaTag('og:image', ogImage);
    
    // Handle canonical URL
    if (canonicalUrl) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      
      if (linkTag) {
        linkTag.setAttribute('href', canonicalUrl);
      } else {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        linkTag.setAttribute('href', canonicalUrl);
        document.head.appendChild(linkTag);
      }
    }
    
    // Cleanup function
    return () => {
      // Optional: Remove tags when component unmounts if needed
      // This is usually unnecessary and can cause flickering
    };
  }, [
    title, description, keywords, 
    ogTitle, ogDescription, ogType, 
    ogUrl, ogImage, canonicalUrl
  ]);
  
  // This component doesn't render anything
  return null;
};

export default DocumentHead;