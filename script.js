document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       NAVIGATION SCROLL EFFECT
    ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       MOBILE MENU TOGGLE
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================
       ACTIVE LINK HIGHLIGHTING
    ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */
    // Select all elements that should animate
    const animateElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Trigger initial check for elements already in view on load
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);

    /* =========================================
       RESUME TABS LOGIC
    ========================================= */
    const resumeTabs = document.querySelectorAll('.resume-tab');
    const resumeContents = document.querySelectorAll('.resume-tab-content');

    resumeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            resumeTabs.forEach(t => t.classList.remove('active'));
            resumeContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const targetId = `tab-${tab.getAttribute('data-tab')}`;
            const targetContent = document.getElementById(targetId);
            if(targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* =========================================
       CONTACT FORM SUBMISSION (AJAX)
    ========================================= */
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;

            // Optional enhancement: visually indicate loading state
            submitBtn.innerText = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            fetch(this.action, {
                method: this.method,
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.innerText = 'Message Sent! \u2714';
                    submitBtn.style.background = '#10b981'; // Green success
                    submitBtn.style.opacity = '1';
                    this.reset();
                } else {
                    submitBtn.innerText = 'Error! Try Again.';
                    submitBtn.style.background = '#ef4444'; // Red error
                    submitBtn.style.opacity = '1';
                }
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                submitBtn.innerText = 'Error! Try Again.';
                submitBtn.style.background = '#ef4444';
                submitBtn.style.opacity = '1';
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    /* =========================================
       THEME TOGGLE
    ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

});
