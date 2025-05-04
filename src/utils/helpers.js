/**
 * Format a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  /**
   * Truncate text to a specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length of the text
   * @returns {string} - Truncated text with ellipsis if needed
   */
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Create a delay using Promise
   * @param {number} ms - Time to delay in milliseconds
   * @returns {Promise} - Promise that resolves after the delay
   */
  export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Generate a random ID
   * @returns {string} - Random ID
   */
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  /**
   * Group array items by a specific property
   * @param {Array} array - Array to group
   * @param {string} key - Property to group by
   * @returns {Object} - Grouped items
   */
  export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  };
  
  /**
   * Check if an element is in viewport
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} - Whether element is in viewport
   */
  export const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  /**
   * Debounce a function call
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Parse markdown to HTML (very basic implementation)
   * @param {string} markdown - Markdown text
   * @returns {string} - HTML string
   */
  export const parseMarkdown = (markdown) => {
    if (!markdown) return '';
    
    // Replace headers
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>');
    
    // Replace bold and italic
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Replace code blocks
    html = html
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Replace links and images
    html = html
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Replace lists
    html = html
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/^\+ (.*$)/gm, '<li>$1</li>');
    
    // Wrap adjacent list items in ul
    html = html.replace(/(<li>.*<\/li>)\s+(?=<li>)/g, '$1</ul><ul>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // Replace paragraphs (must be after all other replacements)
    html = html.replace(/^(?!<[hou]).+$/gm, '<p>$&</p>');
    
    return html;
  };