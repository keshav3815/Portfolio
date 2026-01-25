// ==============================
// Navbar scroll effect
// ==============================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==============================
// Active nav link on scroll
// ==============================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
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

// ==============================
// DOM Loaded
// ==============================
document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // Current Year
    // ==============================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==============================
    // Back to Top Button
    // ==============================
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (!backToTop) return;
        backToTop.classList.toggle('active', window.pageYOffset > 300);
    });

    // ==============================
    // Newsletter Form
    // ==============================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const messageDiv = document.getElementById('newsletterMessage');

            if (emailInput.checkValidity()) {
                messageDiv.textContent = "Thank you for subscribing!";
                messageDiv.style.color = "#0d6efd";
                messageDiv.style.display = "block";
                emailInput.value = "";

                setTimeout(() => messageDiv.style.display = "none", 5000);
            } else {
                messageDiv.textContent = "Please enter a valid email address.";
                messageDiv.style.color = "#dc3545";
                messageDiv.style.display = "block";
            }
        });
    }

    // ==============================
    // Contact Form (Backend Connected)
    // ==============================
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = form.querySelector('.submit-text');
    const spinner = form.querySelector('.spinner-border');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        submitText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitBtn.disabled = true;

        const data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error("Submission failed");
            }

            formMessage.textContent = "Message sent successfully!";
            formMessage.className = "alert alert-success mt-4";
            form.reset();
            form.classList.remove('was-validated');

        } catch (err) {
            formMessage.textContent = "Error sending message. Please try again later.";
            formMessage.className = "alert alert-danger mt-4";
        }

        spinner.classList.add('d-none');
        submitText.textContent = 'Send Message';
        submitBtn.disabled = false;
    });

    // ==============================
    // Chatbot Functionality
    // ==============================
    console.log('Chatbot initializing...');

    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    if (!chatbotWidget) {
        console.error('Chatbot widget not found');
        return;
    }
    if (!chatbotToggle) {
        console.error('Chatbot toggle not found');
        return;
    }
    if (!chatbotContainer) {
        console.error('Chatbot container not found');
        return;
    }
    if (!chatbotClose) {
        console.error('Chatbot close not found');
        return;
    }
    if (!chatbotMessages) {
        console.error('Chatbot messages not found');
        return;
    }
    if (!chatbotInput) {
        console.error('Chatbot input not found');
        return;
    }
    if (!chatbotSend) {
        console.error('Chatbot send not found');
        return;
    }

    console.log('All chatbot elements found');

    let isTyping = false;
    let messageCount = 0;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        console.log('Toggle clicked');
        const isVisible = chatbotContainer.style.display === 'flex';
        chatbotContainer.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            chatbotInput.focus();
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        console.log('Close clicked');
        chatbotContainer.style.display = 'none';
    });

    // Show typing indicator
    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.style.display = 'flex';
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        isTyping = false;
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.style.display = 'none';
        }
    }

    // Save message to localStorage
    function saveToHistory(content, type) {
        try {
            const history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
            history.push({ content, type, timestamp: Date.now() });
            // Keep only last 50 messages
            if (history.length > 50) {
                history.splice(0, history.length - 50);
            }
            localStorage.setItem('chatbotHistory', JSON.stringify(history));
        } catch (e) {
            console.error('Error saving to history:', e);
        }
    }

    // Load chat history
    function loadHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
            history.forEach(msg => {
                addMessage(msg.content, msg.type);
            });
        } catch (e) {
            console.error('Error loading history:', e);
        }
    }

    // Add message to chat
    function addMessage(content, type) {
        console.log('Adding message:', content, type);
        if (!chatbotMessages) {
            console.error('chatbotMessages is null');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;  // Changed to innerHTML to support links

        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Save to history
        saveToHistory(content, type);

        // Check for feedback
        messageCount++;
        if (messageCount === 3 && !localStorage.getItem('feedbackShown')) {
            setTimeout(() => {
                addMessage('How helpful was this conversation? <button class="feedback-btn" onclick="giveFeedback(\'helpful\')">👍 Helpful</button> <button class="feedback-btn" onclick="giveFeedback(\'not-helpful\')">👎 Not Helpful</button>', 'bot');
                localStorage.setItem('feedbackShown', 'true');
            }, 2000);
        }
    }

    // Send message
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message || isTyping) return;

        console.log('Sending message:', message);

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            console.log('Response data:', data);

            hideTypingIndicator();
            if (data.response) {
                setTimeout(() => {
                    addMessage(data.response, 'bot');
                    console.log('Bot message added');
                }, 500);
            } else {
                addMessage('Sorry, I\'m having trouble processing your request right now.', 'bot');
            }
        } catch (error) {
            console.log('Fetch failed, using mock response');
            hideTypingIndicator();
            // Mock response for testing
            const mockResponse = generateMockResponse(message);
            setTimeout(() => {
                addMessage(mockResponse, 'bot');
                console.log('Mock bot message added');
            }, 500);
            console.error('Chatbot error:', error);
        }
    };

    // Mock response generator for offline testing
    function generateMockResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();

        // Greeting responses
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greetings')) {
            return "Hello! I'm Keshav's AI assistant. I can tell you about his background, skills, projects, and more. What would you like to know?";
        }

        // About Keshav
        if (msg.includes('who are you') || msg.includes('about keshav') || msg.includes('tell me about yourself') || msg.includes('who is keshav')) {
            return "I'm Keshav Singh, a passionate web developer and GenAI engineer. I specialize in creating beautiful, functional websites with clean code and modern design principles. I love bringing ideas to life through technology!";
        }

        // Specific projects (put these first for more specific matching)
        if (msg.includes('dailyjob') || msg.includes('job marketplace')) {
            return "DailyJob is Keshav's job marketplace platform where employers can post jobs and job seekers can find opportunities. It features user authentication, job posting, application tracking, and a modern, responsive design.";
        }

        if (msg.includes('trv') || msg.includes('technologies') || msg.includes('trv technologies')) {
            return "Keshav developed the official website for TRV Technologies LLP, showcasing their services, portfolio, and contact information. The site features a professional design with smooth animations and responsive layout.";
        }

        if (msg.includes('freequademy') || msg.includes('kanban') || msg.includes('productivity')) {
            return "Freequademy is Keshav's Kanban-based productivity tool that helps users organize tasks and manage workflows efficiently. It includes drag-and-drop functionality, task categorization, and progress tracking.";
        }

        // Specific skills and technologies
        if (msg.includes('html') || msg.includes('css') || msg.includes('javascript') || msg.includes('js')) {
            return "Keshav is highly proficient in HTML5, CSS3, and JavaScript. He creates responsive, modern web interfaces using these core technologies along with frameworks like Bootstrap for styling and jQuery for enhanced interactivity.";
        }

        if (msg.includes('python')) {
            return "Keshav uses Python for backend development, data processing, and AI/ML projects. He's experienced with frameworks like Flask and Django, and uses Python for automation and scripting tasks.";
        }

        if (msg.includes('react') || msg.includes('vue') || msg.includes('angular')) {
            return "Keshav works with modern JavaScript frameworks including React.js and Vue.js. He builds dynamic, component-based user interfaces and single-page applications using these technologies.";
        }

        if (msg.includes('node') || msg.includes('express') || msg.includes('backend')) {
            return "For backend development, Keshav uses Node.js with Express.js to create robust server-side applications. He builds RESTful APIs and handles server-side logic efficiently.";
        }

        if (msg.includes('laravel') || msg.includes('php')) {
            return "Keshav has experience with Laravel (PHP framework) for building scalable web applications. He uses it for rapid application development and maintains clean, organized code.";
        }

        if (msg.includes('ai') || msg.includes('genai') || msg.includes('llm') || msg.includes('langchain')) {
            return "Keshav is passionate about Generative AI and Large Language Models. He works with technologies like LangChain to build AI-powered applications and integrates AI capabilities into web projects.";
        }

        if (msg.includes('database') || msg.includes('mysql') || msg.includes('mongodb')) {
            return "Keshav works with various databases including MySQL for relational data and MongoDB for NoSQL solutions. He designs efficient database schemas and optimizes queries for better performance.";
        }

        if (msg.includes('git') || msg.includes('github') || msg.includes('version control')) {
            return "Keshav uses Git for version control and maintains his projects on GitHub. You can check out his repositories at https://github.com/keshav3815 to see his coding style and contributions.";
        }

        if (msg.includes('docker') || msg.includes('aws') || msg.includes('cloud')) {
            return "Keshav has experience with containerization using Docker and cloud platforms like AWS. He deploys applications efficiently and manages infrastructure for scalable solutions.";
        }

        // Experience and background
        if (msg.includes('experience') || msg.includes('background') || msg.includes('work experience')) {
            return "Keshav has experience in full-stack web development, creating responsive websites and web applications. He's worked on various projects including job marketplaces, business websites, and productivity tools. He's always eager to learn new technologies and take on challenging projects.";
        }

        if (msg.includes('education') || msg.includes('degree') || msg.includes('study') || msg.includes('college')) {
            return "Keshav is pursuing his education in Computer Science/Engineering and continuously expanding his knowledge through online courses, tutorials, and practical projects. He believes in lifelong learning and staying updated with the latest technologies.";
        }

        // Contact and hiring
        if (msg.includes('contact') || msg.includes('hire') || msg.includes('work with') || msg.includes('reach')) {
            return "You can contact Keshav through the contact form on his portfolio website. He's always open to new opportunities and collaborations! Connect with him on LinkedIn: https://www.linkedin.com/in/keshav-singh3815/, Instagram: https://www.instagram.com/thisiskeshavsingh/, or GitHub: https://github.com/keshav3815.";
        }

        if (msg.includes('email') || msg.includes('mail')) {
            return "You can reach Keshav through the contact form on this website. He'll get back to you as soon as possible!";
        }

        if (msg.includes('linkedin') || msg.includes('social media')) {
            return "Connect with Keshav professionally on LinkedIn: https://www.linkedin.com/in/keshav-singh3815/. You can also find him on Instagram: https://www.instagram.com/thisiskeshavsingh/ and GitHub: https://github.com/keshav3815.";
        }

        // General skills
        if (msg.includes('skill') || msg.includes('technology') || msg.includes('programming') || msg.includes('expertise')) {
            return "Keshav is proficient in HTML5, CSS3, JavaScript, Python, and works with frameworks like React, Vue.js, Laravel, Node.js, and Bootstrap. He also has experience with AI technologies like LLM and Langchain, and tools like Git, Docker, AWS, and MySQL.";
        }

        // Projects general
        if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
            return "Keshav has worked on several exciting projects including DailyJob (a job marketplace), TRV Technologies LLP website, and Freequademy (a Kanban-based productivity tool). Check out his projects section here: <a href='#projects'>Projects</a>.";
        }

        // Location
        if (msg.includes('location') || msg.includes('where') || msg.includes('live') || msg.includes('based')) {
            return "Keshav is based in New Delhi, India. He's open to remote work opportunities and collaborations worldwide.";
        }

        // Hobbies/Interests
        if (msg.includes('hobby') || msg.includes('interest') || msg.includes('free time') || msg.includes('passion')) {
            return "Besides coding, Keshav enjoys learning about new technologies, contributing to open-source projects, and exploring AI/ML applications. He also likes reading tech blogs and staying updated with industry trends.";
        }

        return "I'm not sure about that specific question, but I'd be happy to tell you about Keshav's skills, projects, or background. What would you like to know?";
    }

    // Send button click
    chatbotSend.addEventListener('click', () => {
        console.log('Send button clicked');
        sendMessage();
    });

    // Enter key press
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Load chat history on startup
    loadHistory();

    // Global feedback function
    window.giveFeedback = function(type) {
        addMessage(`Thank you for your feedback! ${type === 'helpful' ? 'I\'m glad I could help!' : 'I\'ll work on improving my responses.'}`, 'bot');
    };

});
