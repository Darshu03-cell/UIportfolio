// Navigation scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = ['hero', 'about', 'portfolio', 'testimonials', 'contact'];
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('[data-scroll]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Hide mobile menu after click
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Active section highlighting
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        navItems.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`[data-scroll="${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remove active class from all nav links
                    document.querySelectorAll('[data-scroll]').forEach(link => {
                        link.classList.remove('text-primary', 'bg-accent');
                        link.classList.add('text-muted-foreground');
                    });
                    
                    // Add active class to current nav link
                    navLink.classList.remove('text-muted-foreground');
                    navLink.classList.add('text-primary', 'bg-accent');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial call
});

// Contact form functionality
function handleContactSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const form = event.target;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Message Sent!';
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = '<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>Send Message';
            submitBtn.disabled = false;
            alert('Message sent successfully! I\'ll get back to you soon.');
        }, 3000);
    }, 2000);
}