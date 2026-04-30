/**
 * Watch Image Generator
 * Creates professional SVG watch visualizations for luxury watch e-commerce
 */

class WatchImageGenerator {
  /**
   * Get brand-specific color and design style
   */
  static getBrandColor(brand) {
    const brandColors = {
      'rolex': '#D4AF37',           // Gold
      'omega': '#1E90FF',           // Blue
      'patek philippe': '#FF6B6B',  // Red
      'audemars piguet': '#228B22', // Forest Green
      'breitling': '#FFD700',       // Bright Gold
      'tag heuer': '#DC143C',       // Crimson Red
      'cartier': '#FFD700',         // Gold
      'longines': '#4169E1',        // Royal Blue
      'tudor': '#2F4F4F',           // Dark Slate Gray
      'tissot': '#8B0000',          // Dark Red
      'seiko': '#FF4500',           // Orange Red
      'citizen': '#4B0082',         // Indigo
      'movado': '#000000',          // Black
      'default': '#C0C0C0'          // Silver
    };
    return brandColors[brand.toLowerCase()] || brandColors['default'];
  }

  /**
   * Generate professional watch SVG with gradient and shadows
   */
  static generateWatchSVG(brand, model) {
    const color = this.getBrandColor(brand);
    const size = 300;
    const centerX = 150;
    const centerY = 150;
    
    // SVG with gradients for 3D effect
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradient for watch case (3D effect) -->
          <radialGradient id="caseGrad" cx="30%" cy="30%">
            <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Gradient for dial -->
          <radialGradient id="dialGrad" cx="40%" cy="40%">
            <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </radialGradient>
          
          <!-- Metal shine -->
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#fff;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#fff;stop-opacity:0" />
          </linearGradient>
        </defs>
        
        <!-- Shadow -->
        <circle cx="${centerX}" cy="${centerY + 3}" r="145" fill="#000" opacity="0.2"/>
        
        <!-- Outer case/lugs -->
        <rect x="75" y="20" width="150" height="260" rx="25" fill="url(#caseGrad)" stroke="#444" stroke-width="2"/>
        
        <!-- Case bezel (octagonal look) -->
        <circle cx="${centerX}" cy="${centerY}" r="142" fill="none" stroke="${color}" stroke-width="6" opacity="0.8"/>
        <circle cx="${centerX}" cy="${centerY}" r="138" fill="none" stroke="#333" stroke-width="1" opacity="0.5"/>
        
        <!-- Dial -->
        <circle cx="${centerX}" cy="${centerY}" r="135" fill="url(#dialGrad)"/>
        
        <!-- Inner bezel ring -->
        <circle cx="${centerX}" cy="${centerY}" r="133" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/>
        
        <!-- Hour markers (12 positions) -->
        ${this.generateHourMarkers(centerX, centerY, color)}
        
        <!-- Date window (optional) -->
        <rect x="120" y="155" width="30" height="25" rx="2" fill="#000" stroke="${color}" stroke-width="1" opacity="0.7"/>
        <text x="135" y="172" font-family="'Arial', sans-serif" font-size="10" fill="${color}" text-anchor="middle" font-weight="bold">23</text>
        
        <!-- Hour hand -->
        <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - 50}" 
              stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
        
        <!-- Minute hand -->
        <line x1="${centerX}" y1="${centerY}" x2="${centerX + 35}" y2="${centerY}" 
              stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
        
        <!-- Second hand (thin) -->
        <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - 70}" 
              stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        
        <!-- Center cap -->
        <circle cx="${centerX}" cy="${centerY}" r="6" fill="${color}"/>
        <circle cx="${centerX}" cy="${centerY}" r="4" fill="#333"/>
        
        <!-- Brand name at top -->
        <text x="${centerX}" y="95" font-family="'Playfair Display', serif" font-size="16" fill="${color}" 
              text-anchor="middle" font-weight="bold" letter-spacing="2">
          ${brand.toUpperCase().substring(0, 8)}
        </text>
        
        <!-- Model name at bottom -->
        <text x="${centerX}" y="215" font-family="'Arial', sans-serif" font-size="11" fill="#999" 
              text-anchor="middle">
          ${model.substring(0, 20)}
        </text>
        
        <!-- Chronograph subdials (decorative) -->
        <circle cx="95" cy="110" r="12" fill="none" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <circle cx="205" cy="110" r="12" fill="none" stroke="${color}" stroke-width="1" opacity="0.4"/>
        
        <!-- Shine/gloss overlay -->
        <ellipse cx="${centerX - 30}" cy="${centerY - 40}" rx="50" ry="60" fill="url(#shine)"/>
      </svg>
    `;
    
    return svg;
  }

  /**
   * Generate hour markers
   */
  static generateHourMarkers(centerX, centerY, color) {
    let markers = '';
    const radius = 115;
    const innerRadius = 100;
    
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX + innerRadius * Math.cos(angle);
      const y2 = centerY + innerRadius * Math.sin(angle);
      
      // Every 3rd marker is thicker (for 3, 6, 9, 12)
      const isMain = (i % 3 === 0);
      const strokeWidth = isMain ? 3 : 2;
      const opacity = isMain ? 1 : 0.7;
      
      markers += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${opacity}"/>`;
    }
    
    return markers;
  }

  /**
   * Get watch image as data URL
   */
  static getWatchImageDataURL(brand, model) {
    const svg = this.generateWatchSVG(brand, model);
    const encoded = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${encoded}`;
  }
}
