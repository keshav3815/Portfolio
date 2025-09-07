// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add active class to current nav item
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
 
// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = form.querySelector('.submit-text');
    const spinner = form.querySelector('.spinner-border');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        // Show loading state
        submitText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            // Hide loading state
            submitText.textContent = 'Message Sent!';
            spinner.classList.add('d-none');
            
            // Show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.classList.remove('d-none', 'alert-danger');
            formMessage.classList.add('alert-success');
            
            // Reset form after 3 seconds
            setTimeout(function() {
                form.reset();
                form.classList.remove('was-validated');
                submitText.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
});
// Current Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Back to Top Button
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Newsletter Form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const messageDiv = document.getElementById('newsletterMessage');
        
        if (emailInput.checkValidity()) {
            // Simulate form submission
            messageDiv.textContent = "Thank you for subscribing!";
            messageDiv.style.color = "#0d6efd";
            messageDiv.style.display = "block";
            emailInput.value = "";
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = "none";
            }, 5000);
        } else {
            messageDiv.textContent = "Please enter a valid email address.";
            messageDiv.style.color = "#dc3545";
            messageDiv.style.display = "block";
        }
    });
