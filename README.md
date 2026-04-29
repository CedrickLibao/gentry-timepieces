# Gentry Timepieces - Luxury Watch E-Commerce Platform

## Project Overview
Gentry Timepieces is a luxury watch retailer web platform featuring brands like Rolex, Omega, and Patek Philippe. The project is currently a static HTML/CSS/JavaScript site and is being upgraded for better design, security, and full e-commerce functionality.

---

## Improvements Roadmap

### DESIGN & RESPONSIVENESS
- [x] Add mobile-first media queries (CSS breakpoints: 480px, 768px, 1024px, 1440px)
      - ✓ Implemented in css/style.css with responsive breakpoints
- [x] Implement hamburger menu for mobile navigation
      - ✓ Added hamburger icon that toggles nav on screens < 768px
      - ✓ Animated hamburger icon with smooth transitions
- [x] Fix hero section height for mobile
      - ✓ Changed from 90vh to min-height: 60vh with flexible padding
- [x] Make buttons/forms touch-friendly (min 44px height)
      - ✓ All buttons, inputs, and form fields now have min-height: 44px
- [x] Stack footer links vertically on mobile
      - ✓ Footer links use flexbox with responsive wrapping
- [x] Responsive typography
      - ✓ Used CSS clamp() for scalable font sizes (h1, h2, p, buttons)

### FUNCTIONALITY & USER EXPERIENCE
- [x] Create a fully functional "Book Visit" page (appointment form)
      - ✓ Created /book-visit/index.html with complete appointment booking form
      - ✓ Form validation for name, email, date, time, preferred watch
      - ✓ Success/error messages with visual feedback
- [x] Implement "Book Viewing" button (modal/form)
      - ✓ Modal popup with form to request viewing for specific watch
      - ✓ Animated modal transitions
      - ✓ Click outside to close, ESC key support
- [ ] Build product detail pages for each watch
- [ ] "Explore Collection" button scrolls to products
      - ✓ Implemented smooth scroll to products section
- [ ] Search/filter functionality
- [ ] Shopping cart system
- [ ] Product image gallery with lightbox
- [ ] Admin dashboard for product management

### BACKEND & AUTHENTICATION (Critical)
- [ ] Node.js/Express backend server
- [ ] PostgreSQL/MongoDB schemas: Users, Products, Bookings, Cart
- [ ] JWT-based authentication (login/register/verify)
- [ ] REST API endpoints for products, bookings, user data

### SECURITY (Critical)
- [x] Remove innerHTML in component-loader.js (use DOMParser or safe DOM methods)
      - ✓ Replaced innerHTML with DOMParser for secure HTML injection
      - ✓ Added error handling for parsing failures
- [x] Input validation on all forms
      - ✓ Email validation (format check)
      - ✓ Password validation (min length)
      - ✓ Date/time validation
      - ✓ Required field checks with error messages
- [ ] Password hashing (bcrypt)
- [ ] CSRF tokens
- [ ] HTTPS setup
- [ ] Content Security Policy (CSP) headers
- [ ] Rate limiting, CORS, input sanitization
- [ ] Store secrets in .env
- [ ] Form validation feedback
      - ✓ Real-time validation feedback on forms
      - ✓ Error messages shown below fields
- [ ] Logout/session clearing

### PERFORMANCE OPTIMIZATION
- [ ] Lazy loading for images
- [ ] Optimize hero image (WebP, srcset)
- [ ] Minify CSS/JS
- [ ] Gzip compression
- [ ] Caching headers
- [ ] Preload critical fonts/resources
- [ ] Remove duplicate files
- [ ] Use CDN for static assets
- [ ] Resource hints (preconnect)
- [ ] Optimize images (WebP, alt text, dimensions)

### CODE QUALITY
- [ ] JSDoc comments
- [ ] Use ES6 modules
- [ ] Error handling for API/component loading
- [ ] Fallback UI for component loading
- [ ] Console error logging
- [ ] Organize code: components/, pages/, utils/, css/

### TESTING & QA
- [ ] Unit tests for auth logic
- [ ] Integration tests for API
- [ ] Responsive testing on real devices
- [ ] Security testing (XSS, CSRF, SQLi)

### DEPLOYMENT
- [ ] Deploy backend (Vercel/Heroku/AWS)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] GitHub Actions for CI/CD
- [ ] Error monitoring (Sentry)

---

## Getting Started
1. **Clone the repo:**
   ```bash
   git clone https://github.com/CedrickLibao/gentry-timepieces.git
   ```
2. **Open in VS Code**
3. **Run a local server** (for static site):
   - Use Live Server extension or:
   ```bash
   npx serve .
   ```
4. **Start development:**
   - Begin with security and mobile responsiveness improvements

---

## Contribution Guidelines
- Use feature branches for new features
- Write clear commit messages
- Test on both desktop and mobile
- Prioritize security and accessibility

---

## License
MIT