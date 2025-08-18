// Advanced animations and scroll effects for GlobalLogistics website

document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeCounters();
    initializeProgressBars();
    initializeParallax();
    initializeAdvancedAnimations();
    initializeHoverEffects();
    initializeScrollReveal();
    initializeTextAnimations();
});

// Initialize AOS (Animate On Scroll) library
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
        
        // Refresh AOS on dynamic content load
        window.addEventListener('load', function() {
            AOS.refresh();
        });
    }
}

// Animated counters for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-count'));
                const isDecimal = counter.getAttribute('data-count').includes('.');
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    
                    let currentValue;
                    if (isDecimal) {
                        currentValue = (targetValue * easeOutCubic).toFixed(1);
                    } else {
                        currentValue = Math.floor(targetValue * easeOutCubic);
                    }
                    
                    // Format large numbers with commas
                    if (currentValue >= 1000) {
                        counter.textContent = numberWithCommas(currentValue);
                    } else {
                        counter.textContent = currentValue;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Ensure final value is exact
                        if (targetValue >= 1000) {
                            counter.textContent = numberWithCommas(targetValue);
                        } else {
                            counter.textContent = targetValue;
                        }
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Animated progress bars (fixed version)
// Advanced animations and scroll effects for GlobalLogistics website

document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeCounters();
    initializeProgressBars();
    initializeParallax();
    initializeAdvancedAnimations();
    initializeHoverEffects();
    initializeScrollReveal();
    initializeTextAnimations();
});

// Initialize AOS (Animate On Scroll) library
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
        
        // Refresh AOS on dynamic content load
        window.addEventListener('load', function() {
            AOS.refresh();
        });
    }
}

// Animated counters for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-count'));
                const isDecimal = counter.getAttribute('data-count').includes('.');
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    
                    let currentValue;
                    if (isDecimal) {
                        currentValue = (targetValue * easeOutCubic).toFixed(1);
                    } else {
                        currentValue = Math.floor(targetValue * easeOutCubic);
                    }
                    
                    // Format large numbers with commas
                    if (currentValue >= 1000) {
                        counter.textContent = numberWithCommas(currentValue);
                    } else {
                        counter.textContent = currentValue;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Ensure final value is exact
                        if (targetValue >= 1000) {
                            counter.textContent = numberWithCommas(targetValue);
                        } else {
                            counter.textContent = targetValue;
                        }
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Animated progress bars (fixed version)
// Fixed progress bars initialization
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Create a single animation frame request ID
    let animationFrameId = null;
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        // Cancel any pending animation frame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                
                // Only animate if not already at target width
                if (progressBar.style.width !== progressBar.dataset.width) {
                    animateProgressBar(progressBar);
                }
                
                // Unobserve after animation starts
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate a single progress bar
    function animateProgressBar(bar) {
        const targetWidth = bar.dataset.width || '100%';
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();
        const startWidth = 0;
        const endWidth = parseFloat(targetWidth);
        
        bar.style.transition = 'none';
        bar.style.width = '0%';
        
        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smoother animation
            const easedProgress = easeOutQuad(progress);
            const currentWidth = startWidth + (endWidth - startWidth) * easedProgress;
            
            bar.style.width = `${currentWidth}%`;
            
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                // Ensure final width is exact
                bar.style.width = targetWidth;
                animationFrameId = null;
            }
        }
        
        // Force reflow before starting animation
        void bar.offsetWidth;
        animationFrameId = requestAnimationFrame(updateProgress);
    }
    
    // Easing function
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    
    // Initialize all progress bars
    progressBars.forEach(bar => {
        // Store target width in dataset if not already set
        if (!bar.dataset.width && bar.style.width) {
            bar.dataset.width = bar.style.width;
        }
        
        // Reset to 0 width initially
        bar.style.width = '0%';
        bar.style.transition = 'none';
        
        // Start observing
        progressObserver.observe(bar);
    });
}


// Enhanced parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Use requestAnimationFrame for smooth animation
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });
}

// Advanced animations for various elements
function initializeAdvancedAnimations() {
    // Floating animation for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const animationDelay = index * 0.5;
        const animationDuration = 6 + (index % 3);
        
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${animationDuration}s`;
    });
    
    // Staggered animations for grid items
    const gridItems = document.querySelectorAll('.services-grid .service-card, .values-grid .value-card, .team-grid .team-card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Typewriter effect for hero titles
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        createTypewriterEffect(element);
    });
    
    // Morphing background shapes
    createMorphingShapes();
}

// Typewriter effect
function createTypewriterEffect(element) {
    const text = element.textContent;
    const speed = 100; // milliseconds per character
    
    element.textContent = '';
    element.style.borderRight = '2px solid';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    // Start typing after element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
}

// Morphing background shapes
function createMorphingShapes() {
    const heroSections = document.querySelectorAll('.hero, .page-header');
    
    heroSections.forEach(section => {
        const morphingShape = document.createElement('div');
        morphingShape.className = 'morphing-shape';
        morphingShape.style.cssText = `
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: morph 20s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;
        
        section.style.position = 'relative';
        section.appendChild(morphingShape);
    });
    
    // Add morphing animation CSS
    if (!document.querySelector('#morphing-styles')) {
        const style = document.createElement('style');
        style.id = 'morphing-styles';
        style.textContent = `
            @keyframes morph {
                0%, 100% { 
                    transform: scale(1) rotate(0deg);
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                }
                25% { 
                    transform: scale(1.1) rotate(90deg);
                    border-radius: 40% 60% 70% 30% / 30% 70% 40% 60%;
                }
                50% { 
                    transform: scale(0.9) rotate(180deg);
                    border-radius: 70% 30% 40% 60% / 70% 40% 60% 30%;
                }
                75% { 
                    transform: scale(1.05) rotate(270deg);
                    border-radius: 30% 70% 60% 40% / 40% 60% 30% 70%;
                }
            }
            
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: currentColor; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced hover effects
function initializeHoverEffects() {
    // 3D tilt effect for cards
    const tiltCards = document.querySelectorAll('.service-card, .value-card, .team-card, .terminal-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease-out';
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Magnetic effect for buttons
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Scroll-triggered reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Add reveal styles if not present
    if (!document.querySelector('#reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            
            .reveal-on-scroll.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Text animations
function initializeTextAnimations() {
    // Split text into spans for individual character animation
    const animatedTexts = document.querySelectorAll('.animate-text');
    
    animatedTexts.forEach(text => {
        const textContent = text.textContent;
        text.innerHTML = '';
        
        textContent.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.className = 'char-animate';
            text.appendChild(span);
        });
    });
    
    // Observe when text comes into view
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-start');
                textObserver.unobserve(entry.target);
            }
        });
    });
    
    animatedTexts.forEach(text => {
        textObserver.observe(text);
    });
    
    // Add text animation styles
    if (!document.querySelector('#text-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'text-animation-styles';
        style.textContent = `
            .char-animate {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
                transition: all 0.6s ease-out;
            }
            
            .animate-start .char-animate {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth page transitions
function initializePageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }
            
            e.preventDefault();
            
            // Create overlay for transition
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                z-index: 9999;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.5s ease-in-out;
            `;
            
            document.body.appendChild(overlay);
            
            // Animate overlay in
            setTimeout(() => {
                overlay.style.transform = 'scaleX(1)';
            }, 10);
            
            // Navigate to new page
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Initialize page transitions
initializePageTransitions();

// Intersection Observer polyfill fallback
if (!window.IntersectionObserver) {
    // Simple fallback for older browsers
    window.IntersectionObserver = function(callback) {
        this.observe = function(element) {
            // Simple scroll-based detection
            function checkVisibility() {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    callback([{ isIntersecting: true, target: element }]);
                    window.removeEventListener('scroll', checkVisibility);
                }
            }
            
            window.addEventListener('scroll', checkVisibility);
            checkVisibility(); // Check immediately
        };
        
        this.unobserve = function() {};
    };
}

// Performance monitoring for animations
function monitorAnimationPerformance() {
    if (window.performance && window.performance.mark) {
        window.performance.mark('animations-start');
        
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        function countFrames() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Log performance warning if FPS is too low
                if (fps < 30) {
                    console.warn('Animation performance warning: FPS is', fps);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        }
        
        requestAnimationFrame(countFrames);
    }
}

// Start performance monitoring
monitorAnimationPerformance();

// Reduce motion for users who prefer it
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Use requestAnimationFrame for smooth animation
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });
}

// Advanced animations for various elements
function initializeAdvancedAnimations() {
    // Floating animation for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const animationDelay = index * 0.5;
        const animationDuration = 6 + (index % 3);
        
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${animationDuration}s`;
    });
    
    // Staggered animations for grid items
    const gridItems = document.querySelectorAll('.services-grid .service-card, .values-grid .value-card, .team-grid .team-card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Typewriter effect for hero titles
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        createTypewriterEffect(element);
    });
    
    // Morphing background shapes
    createMorphingShapes();
}

// Typewriter effect
function createTypewriterEffect(element) {
    const text = element.textContent;
    const speed = 100; // milliseconds per character
    
    element.textContent = '';
    element.style.borderRight = '2px solid';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    // Start typing after element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
}

// Morphing background shapes
function createMorphingShapes() {
    const heroSections = document.querySelectorAll('.hero, .page-header');
    
    heroSections.forEach(section => {
        const morphingShape = document.createElement('div');
        morphingShape.className = 'morphing-shape';
        morphingShape.style.cssText = `
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: morph 20s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;
        
        section.style.position = 'relative';
        section.appendChild(morphingShape);
    });
    
    // Add morphing animation CSS
    if (!document.querySelector('#morphing-styles')) {
        const style = document.createElement('style');
        style.id = 'morphing-styles';
        style.textContent = `
            @keyframes morph {
                0%, 100% { 
                    transform: scale(1) rotate(0deg);
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                }
                25% { 
                    transform: scale(1.1) rotate(90deg);
                    border-radius: 40% 60% 70% 30% / 30% 70% 40% 60%;
                }
                50% { 
                    transform: scale(0.9) rotate(180deg);
                    border-radius: 70% 30% 40% 60% / 70% 40% 60% 30%;
                }
                75% { 
                    transform: scale(1.05) rotate(270deg);
                    border-radius: 30% 70% 60% 40% / 40% 60% 30% 70%;
                }
            }
            
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: currentColor; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced hover effects
function initializeHoverEffects() {
    // 3D tilt effect for cards
    const tiltCards = document.querySelectorAll('.service-card, .value-card, .team-card, .terminal-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease-out';
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Magnetic effect for buttons
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Scroll-triggered reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Add reveal styles if not present
    if (!document.querySelector('#reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            
            .reveal-on-scroll.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Text animations
function initializeTextAnimations() {
    // Split text into spans for individual character animation
    const animatedTexts = document.querySelectorAll('.animate-text');
    
    animatedTexts.forEach(text => {
        const textContent = text.textContent;
        text.innerHTML = '';
        
        textContent.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.className = 'char-animate';
            text.appendChild(span);
        });
    });
    
    // Observe when text comes into view
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-start');
                textObserver.unobserve(entry.target);
            }
        });
    });
    
    animatedTexts.forEach(text => {
        textObserver.observe(text);
    });
    
    // Add text animation styles
    if (!document.querySelector('#text-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'text-animation-styles';
        style.textContent = `
            .char-animate {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
                transition: all 0.6s ease-out;
            }
            
            .animate-start .char-animate {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth page transitions
function initializePageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }
            
            e.preventDefault();
            
            // Create overlay for transition
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                z-index: 9999;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.5s ease-in-out;
            `;
            
            document.body.appendChild(overlay);
            
            // Animate overlay in
            setTimeout(() => {
                overlay.style.transform = 'scaleX(1)';
            }, 10);
            
            // Navigate to new page
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Initialize page transitions
initializePageTransitions();

// Intersection Observer polyfill fallback
if (!window.IntersectionObserver) {
    // Simple fallback for older browsers
    window.IntersectionObserver = function(callback) {
        this.observe = function(element) {
            // Simple scroll-based detection
            function checkVisibility() {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    callback([{ isIntersecting: true, target: element }]);
                    window.removeEventListener('scroll', checkVisibility);
                }
            }
            
            window.addEventListener('scroll', checkVisibility);
            checkVisibility(); // Check immediately
        };
        
        this.unobserve = function() {};
    };
}

// Performance monitoring for animations
function monitorAnimationPerformance() {
    if (window.performance && window.performance.mark) {
        window.performance.mark('animations-start');
        
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        function countFrames() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Log performance warning if FPS is too low
                if (fps < 30) {
                    console.warn('Animation performance warning: FPS is', fps);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        }
        
        requestAnimationFrame(countFrames);
    }
}

// Start performance monitoring
monitorAnimationPerformance();

// Reduce motion for users who prefer it
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
