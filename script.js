// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect
    const typedTextElement = document.querySelector('.typed-text');
    const textOptions = [
        'Logistics Analyst',
        'Environmental Lab Admin',
        'Data Scientist'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = textOptions[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textOptions.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (target >= 1000) {
                    element.textContent = Math.floor(current / 100) / 10 + 'K+';
                } else {
                    element.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target >= 1000) {
                    element.textContent = (target / 1000).toFixed(1) + 'K+';
                } else {
                    element.textContent = target + (target === 98 ? '%' : '+');
                }
            }
        };

        updateCounter();
    }

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 300);
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Bar Chart Animation
    const barFills = document.querySelectorAll('.bar-fill');
    const trendBars = document.querySelectorAll('.trend-bar');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('[data-height]');
                bars.forEach((bar, index) => {
                    const height = bar.getAttribute('data-height');
                    setTimeout(() => {
                        bar.style.height = height + '%';
                    }, index * 100);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bar-chart, .trend-chart').forEach(chart => {
        chartObserver.observe(chart);
    });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.skill-card, .dashboard-card, .project-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});
