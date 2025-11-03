/**
 * ASMF Website - Interactive Features
 * Modern Minimalism with Dark-First Aesthetic
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION & SCROLL EFFECTS
    // ========================================
    
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show on scroll
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.problem-card, .feature-card, .doc-item, .community-card, .layer-card, .recovery-card'
    );
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========================================
    // PARTICLE ANIMATION ENHANCEMENT
    // ========================================
    
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Create additional floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 149, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // ========================================
    // HERO STATISTICS COUNTER ANIMATION
    // ========================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 50; // 50 steps for smooth animation
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (isNaN(target)) {
                    // Handle non-numeric values like "Python"
                    counter.textContent = counter.getAttribute('data-original') || counter.textContent;
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
    
    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500); // Delay for better effect
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ========================================
    // ENHANCED CARD INTERACTIONS
    // ========================================
    
    const cards = document.querySelectorAll('.problem-card, .feature-card, .community-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--glow-hover)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // ========================================
    // DOCUMENTATION LINK TRACKING
    // ========================================
    
    const docLinks = document.querySelectorAll('.doc-item');
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click tracking for analytics
            const docTitle = this.querySelector('.doc-title').textContent;
            console.log(`ASMF: Document accessed - ${docTitle}`);
            
            // Visual feedback
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ========================================
    // ARCHITECTURE FLOW ANIMATION
    // ========================================
    
    const archArrows = document.querySelectorAll('.arch-arrow');
    archArrows.forEach((arrow, index) => {
        arrow.style.animationDelay = `${index * 0.5}s`;
    });
    
    // ========================================
    // RECOVERY PROTOCOL DEMO
    // ========================================
    
    const recoveryFeatures = document.querySelectorAll('.recovery-feature');
    recoveryFeatures.forEach((feature, index) => {
        feature.addEventListener('click', function() {
            // Create a visual pulse effect
            this.style.background = 'var(--primary-500)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 1000);
        });
    });
    
    // ========================================
    // SOCIAL MEDIA INTEGRATION
    // ========================================
    
    function createSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share';
        shareContainer.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;
        
        const shareButtons = [
            {
                name: 'GitHub',
                url: 'https://github.com/Serhii-Stepanov-Baden-Baden/ASMF-Standart-',
                icon: '🔗'
            },
            {
                name: 'Telegram',
                url: 'https://t.me/asmf_community',
                icon: '💬'
            },
            {
                name: 'Medium',
                url: 'https://medium.com/@srg.stepanov/%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-8d8aec10e77d',
                icon: '📝'
            }
        ];
        
        shareButtons.forEach(button => {
            const link = document.createElement('a');
            link.href = button.url;
            link.target = '_blank';
            link.className = 'share-btn';
            link.title = `Visit ASMF on ${button.name}`;
            link.style.cssText = `
                width: 50px;
                height: 50px;
                background: var(--bg-surface);
                border: 1px solid var(--border-default);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                transition: var(--transition-smooth);
                color: var(--text-primary);
                text-decoration: none;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.background = 'var(--primary-500)';
                this.style.transform = 'scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.background = 'var(--bg-surface)';
                this.style.transform = 'scale(1)';
            });
            
            link.textContent = button.icon;
            shareContainer.appendChild(link);
        });
        
        document.body.appendChild(shareContainer);
    }
    
    createSocialShareButtons();
    
    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Reduce animations on low-end devices
    function isLowEndDevice() {
        return navigator.hardwareConcurrency < 4 || 
               navigator.deviceMemory < 4 ||
               window.innerWidth < 768;
    }
    
    if (isLowEndDevice()) {
        // Disable expensive animations
        const style = document.createElement('style');
        style.textContent = `
            .particles { animation: none !important; }
            .floating-particle { animation: none !important; }
            .arch-arrow { animation: none !important; }
            .problem-card:hover,
            .feature-card:hover,
            .community-card:hover,
            .layer-card:hover { transform: none !important; }
        `;
        document.head.appendChild(style);
    }
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    
    // ========================================
    // LOADING COMPLETION
    // ========================================
    
    window.addEventListener('load', function() {
        // Fade in hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Mark as loaded
        document.body.classList.add('loaded');
        console.log('🧠 ASMF v3.0: Autonomous Semantic Memory Framework - Loaded successfully!');
    });
    
    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    
    document.addEventListener('keydown', function(e) {
        // ESC key to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Arrow keys for section navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                const nextIndex = e.key === 'ArrowDown' ? 
                    Math.min(currentIndex + 1, sections.length - 1) :
                    Math.max(currentIndex - 1, 0);
                
                const targetSection = sections[nextIndex];
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });
    
    // ========================================
    // ERROR HANDLING
    // ========================================
    
    window.addEventListener('error', function(e) {
        console.log('ASMF Website: Minor error occurred, but site continues to function normally.');
    });
    
    // ========================================
    // ANALYTICS & TRACKING
    // ========================================
    
    function trackEvent(eventName, eventData = {}) {
        // Placeholder for analytics integration
        console.log(`ASMF Analytics: ${eventName}`, eventData);
    }
    
    // Track page views
    trackEvent('page_view', {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        referrer: document.referrer
    });
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                trackEvent('section_view', {
                    section: entry.target.id || entry.target.className,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ========================================
    // EXPORT FOR GLOBAL ACCESS
    // ========================================
    
    window.ASMFWebsite = {
        version: '3.0',
        name: 'ASMF Official Website',
        loaded: true,
        trackEvent: trackEvent,
        isLowEndDevice: isLowEndDevice
    };
    
});

// ========================================
// SERVICE WORKER REGISTRATION (PWA)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ASMF: ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ASMF: ServiceWorker registration failed');
            });
    });
}
