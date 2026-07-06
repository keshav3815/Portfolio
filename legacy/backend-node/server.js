import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from parent directory (portfolio)
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.json({ message: 'Hello from server', port: PORT, status: 'healthy' });
});

app.get('/health', (req, res) => {
    res.json({ message: 'Server is Healthy', port: PORT, status: 'healthy' });
});

// Chatbot route
app.post('/chat', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const response = generateChatResponse(message.toLowerCase().trim());
    res.json({ response });
});

// Generate chatbot response
function generateChatResponse(userMessage) {
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

    // Default response
    return "I'm not sure about that specific question, but I'd be happy to tell you about Keshav's skills, projects, or background. What would you like to know?";
}


// Route to handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const contactMessage = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };

    // Save to messages.json file
    const messagesFile = path.join(__dirname, 'messages.json');
    let messages = [];

    if (fs.existsSync(messagesFile)) {
        try {
            messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        } catch (err) {
            console.error('Error reading messages file:', err);
        }
    }

    messages.push(contactMessage);

    try {
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
        console.log('New message received:', contactMessage);
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ error: 'Failed to save message' });
    }
});



// Route to view messages (for admin)
app.get('/messages', (req, res) => {
    const messagesFile = path.join(__dirname, 'messages.json');
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        try {
            messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        } catch (err) {
            // ignore
        }
    }

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Contact Messages</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Contact Messages</h1>
            <p>Total messages: ${messages.length}</p>
            ${messages.length === 0 ? '<p>No messages yet.</p>' : messages.map(msg => `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${msg.name} - ${msg.subject}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${msg.email}</h6>
                        <p class="card-text">${msg.message.replace(/\n/g, '<br>')}</p>
                        <small class="text-muted">${new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                </div>
            `).join('')}
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
