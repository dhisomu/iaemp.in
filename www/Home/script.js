document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // --- Header Scroll Logic ---
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40 || !isHomePage) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set initial state
    if (window.scrollY > 40 || !isHomePage) header.classList.add('scrolled');

    // --- Modern Interaction: Reveal on Scroll ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve for performance if you only want it to reveal once
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const interactiveElements = document.querySelectorAll('.service-card, .section-title, .hero-content, .hero-img-box, #publications');
    
    interactiveElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        revealOnScroll.observe(el);
    });

    // Dynamic Class for Visibility
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(styleSheet);

    // --- Smooth Anchor Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destinationId = this.getAttribute('href');
            const targetElement = document.querySelector(destinationId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 85,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("IAEMP Dark Mode Engine Initialized.");
});
