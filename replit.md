# GlobalLogistics Website

## Overview

GlobalLogistics is a static corporate website for a logistics and shipping company that provides worldwide supply chain solutions. The website showcases the company's services including ocean freight, air cargo, land transport, and warehouse management across multiple global terminals. Built as a modern, responsive multi-page website using vanilla HTML, CSS, and JavaScript with external libraries for enhanced functionality like animations and interactive maps.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Website Structure**: The application is built as a traditional multi-page static website with individual HTML files for each section (Home, About, Services, Terminals, Sustainability, Responsibility, Contact). This approach provides fast loading times, easy maintenance, and excellent SEO capabilities.

**Component-Based CSS**: Uses a CSS custom properties system with a comprehensive design token approach, including color schemes, typography scales, spacing systems, and gradients. The architecture follows a modular CSS structure with reusable components like cards, buttons, and navigation elements.

**Progressive Enhancement**: Core functionality works without JavaScript, with JavaScript adding enhanced user experience through animations, interactive maps, form validation, and dynamic behaviors.

**Responsive Design**: Mobile-first approach with flexible grid systems and breakpoint-based responsive design patterns to ensure optimal viewing across all device sizes.

### JavaScript Architecture

**Modular JavaScript Structure**: Separated into multiple specialized modules:
- `main.js`: Core functionality including navigation, loading screens, scroll effects
- `animations.js`: Advanced animations using AOS library and custom scroll-triggered effects  
- `map.js`: Interactive terminal location mapping using Leaflet.js

**Event-Driven Architecture**: Uses modern DOM event handling with intersection observers for performance-optimized scroll effects and lazy loading of animations.

**Third-Party Library Integration**: Integrates external libraries through CDN links for functionality like animations (AOS), mapping (Leaflet.js), and icons (Font Awesome).

### Navigation System

**Fixed Navigation Bar**: Implements a sticky navigation system that transitions from transparent to solid background on scroll, with smooth scroll effects and active page highlighting.

**Mobile-Responsive Menu**: Uses a hamburger menu system for mobile devices with overlay navigation and proper accessibility considerations.

### Animation System

**Scroll-Triggered Animations**: Uses Intersection Observer API combined with AOS library for performance-optimized scroll animations with fallbacks for older browsers.

**Custom Animation Effects**: Includes counter animations, progress bars, parallax effects, hover interactions, and text reveal animations for enhanced user engagement.

## External Dependencies

### Content Delivery Networks (CDN)
- **Google Fonts**: Poppins font family for consistent typography
- **AOS (Animate On Scroll)**: Animation library for scroll-triggered effects
- **Font Awesome**: Icon library for consistent iconography
- **Leaflet.js**: Open-source mapping library for terminal location visualization

### Mapping Service
- **CartoDB/CARTO**: Tile provider for map backgrounds with modern styling
- **OpenStreetMap**: Base mapping data through CartoDB tiles

### Performance Libraries
- **AOS Library**: Handles scroll-based animations with performance optimization
- **Leaflet.js**: Lightweight mapping solution with custom marker systems

The website is designed to be completely self-contained with no backend dependencies, making it suitable for static hosting platforms while providing rich interactive functionality through client-side technologies.