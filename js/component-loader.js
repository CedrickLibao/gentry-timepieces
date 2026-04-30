/**
 * Component Loader - Loads global header and footer components safely
 * Uses DOMParser to sanitize HTML and prevent XSS attacks
 * Works like MVC partial views
 */
async function loadComponent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return await response.text();
  } catch (error) {
    console.error(`Error loading component: ${error}`);
    return '';
  }
}

/**
 * Safely inserts HTML into a container using DOMParser
 * Prevents XSS attacks by parsing HTML before insertion
 */
function safeSetHTML(container, htmlString) {
  if (!container || !htmlString) return;
  
  // Create a parser to safely parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Check for parsing errors
  if (doc.body.innerHTML === '' && htmlString.trim() !== '') {
    console.warn('Failed to parse HTML safely');
    return;
  }
  
  // Clear the container
  container.innerHTML = '';
  
  // Append parsed nodes to container
  while (doc.body.firstChild) {
    container.appendChild(doc.body.firstChild);
  }
}

/**
 * Fix navigation links based on current page location
 */
function fixNavigationLinks() {
  const navLinks = document.querySelectorAll('#main-nav a');
  const currentPath = window.location.pathname;
  
  // Determine base path for links - if in a subdirectory, go up one level
  const isInSubfolder = currentPath.includes('/home/') || 
                       currentPath.includes('/login/') || 
                       currentPath.includes('/watches/') || 
                       currentPath.includes('/book-visit/');
  
  const basePath = isInSubfolder ? '../' : './';
  
  // Map of link text to correct paths relative to root
  const pathMap = {
    'Home': `${basePath}home/index.html`,
    'Watches': `${basePath}watches/index.html`,
    'Book Visit': `${basePath}book-visit/index.html`,
    'Login': `${basePath}login/index.html`
  };
  
  navLinks.forEach(link => {
    const linkText = link.textContent.trim();
    if (pathMap[linkText]) {
      link.href = pathMap[linkText];
      // Add click handler for debugging
      link.addEventListener('click', (e) => {
        console.log(`Navigating to ${link.href}`);
      });
    }
  });
}

/**
 * Fix footer links based on current page location
 */
function fixFooterLinks() {
  const footerLinks = document.querySelectorAll('.footer-links a');
  const currentPath = window.location.pathname;
  
  // Determine base path for links
  const isInSubfolder = currentPath.includes('/home/') || 
                       currentPath.includes('/login/') || 
                       currentPath.includes('/watches/') || 
                       currentPath.includes('/book-visit/');
  
  const basePath = isInSubfolder ? '../' : './';
  
  // Map of link text to correct paths
  const pathMap = {
    'Home': `${basePath}home/index.html`,
    'Watches': `${basePath}watches/index.html`,
    'Login': `${basePath}login/index.html`
  };
  
  footerLinks.forEach(link => {
    const linkText = link.textContent.trim();
    if (pathMap[linkText]) {
      link.href = pathMap[linkText];
    }
  });
}

async function loadComponents() {
  // Determine the base path based on current location
  const path = window.location.pathname;
  let basePath = './';
  
  // If we're in a subfolder (login/, watches/, home/, book-visit/, etc.), go up one level
  if (path.includes('/login/') || path.includes('/watches/') || path.includes('/home/') || path.includes('/book-visit/')) {
    basePath = '../';
  }
  
  try {
    // Load header
    const headerHTML = await loadComponent(`${basePath}includes/header.html`);
    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
      safeSetHTML(headerContainer, headerHTML);
      // Fix navigation links after header is loaded
      setTimeout(fixNavigationLinks, 100);
    }
    
    // Load footer
    const footerHTML = await loadComponent(`${basePath}includes/footer.html`);
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
      safeSetHTML(footerContainer, footerHTML);
      // Fix footer links after footer is loaded
      setTimeout(fixFooterLinks, 100);
    }
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();
  // Hamburger menu logic
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    hamburger.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        nav.classList.toggle('active');
      }
    });
  }
});