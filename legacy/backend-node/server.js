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
        return "I'm Keshav Singh — an AI engineer and full-stack Web3 developer. I build modern apps with Next.js and FastAPI, ship RAG systems and AI agents across the LLM ecosystem, and craft on-chain experiences with Solidity and Web3. I love bringing ideas to life through technology!";
    }

    // Specific projects (put these first for more specific matching)
    if (msg.includes('apc') || msg.includes('ngo') || msg.includes('community')) {
        return "APC is a community-driven NGO engagement platform Keshav built with Next.js, React, FastAPI, WebSockets, and Tailwind CSS. It manages members, volunteers, books, and initiatives, with role-based onboarding, contribution tracking, and real-time engagement dashboards.";
    }

    if (msg.includes('trv') || msg.includes('technologies') || msg.includes('trv technologies')) {
        return "Keshav developed the official website for TRV Technologies LLP, showcasing their services, portfolio, and contact information. The site features a professional design with smooth animations and responsive layout.";
    }

    if (msg.includes('freequademy') || msg.includes('learning platform')) {
        return "Freequademy is Keshav's AI-powered learning platform built with Next.js, FastAPI, LangChain, LlamaIndex, and RAG. It offers free learning resources, mentorship, and community features, plus a RAG-based AI chatbot that answers queries from uploaded notes, PDFs, and syllabus documents, along with MCQ generation and LLM-powered content summarisation.";
    }

    // Frontend
    if (msg.includes('next') || msg.includes('frontend') || msg.includes('shadcn') || msg.includes('framer') || msg.includes('tailwind') || msg.includes('typescript')) {
        return "On the frontend, Keshav builds with Next.js, React, and TypeScript, styled with Tailwind CSS and shadcn/ui, and brings interfaces to life with Framer Motion animations. He focuses on fast, accessible, production-grade UIs.";
    }

    if (msg.includes('react') || msg.includes('component')) {
        return "Keshav builds component-driven UIs with React and Next.js in TypeScript, using shadcn/ui for polished components and Framer Motion for animation. He ships responsive, server-rendered apps with great UX.";
    }

    // Backend
    if (msg.includes('fastapi') || msg.includes('backend') || msg.includes('websocket') || msg.includes('streaming') || msg.includes('sse') || msg.includes('rest')) {
        return "For backends, Keshav uses FastAPI with Python to build fast REST APIs, real-time WebSocket services, and SSE token streaming for AI responses. He focuses on clean, scalable, well-typed server code.";
    }

    if (msg.includes('python')) {
        return "Python is core to Keshav's backend and AI work. He builds high-performance APIs with FastAPI and uses Python across his RAG pipelines, AI agents, and LLM integrations.";
    }

    // Blockchain / Web3 (checked before AI: "blockchain" contains the substring "ai")
    if (msg.includes('blockchain') || msg.includes('web3') || msg.includes('solidity') || msg.includes('smart contract') || msg.includes('nft') || msg.includes('defi') || msg.includes('dao') || msg.includes('ethereum') || msg.includes('metamask') || msg.includes('hardhat') || msg.includes('erc20')) {
        return "On the Web3 side, Keshav writes smart contracts in Solidity (developed and tested with Hardhat), integrates them into apps with Ethers.js and MetaMask, and works with NFTs, ERC20 tokens, DeFi, and DAO patterns.";
    }

    // AI Stack
    if (msg.includes('ai') || msg.includes('genai') || msg.includes('llm') || msg.includes('langchain') || msg.includes('llama') || msg.includes('ollama') || msg.includes('gemini') || msg.includes('openai') || msg.includes('agent') || msg.includes('mcp') || msg.includes('vllm') || msg.includes('rag')) {
        return "AI is Keshav's core focus. He builds RAG systems, AI agents, and multi-agent workflows using LangChain and LlamaIndex, runs models via Ollama, vLLM, the OpenAI API, and Google Gemini, and connects tools through the Model Context Protocol (MCP).";
    }

    // Crypto APIs
    if (msg.includes('crypto') || msg.includes('coingecko') || msg.includes('coinmarketcap') || msg.includes('binance') || msg.includes('tradingview') || msg.includes('market data') || msg.includes('trading')) {
        return "For live crypto market data, Keshav integrates the CoinGecko, CoinMarketCap, and Binance APIs, and embeds TradingView widgets for real-time charts inside his Web3 dashboards.";
    }

    if (msg.includes('database') || msg.includes('mysql') || msg.includes('mongodb')) {
        return "Keshav works with various databases including MySQL for relational data and MongoDB for NoSQL solutions. He designs efficient database schemas and optimizes queries for better performance.";
    }

    if (msg.includes('git') || msg.includes('github') || msg.includes('version control')) {
        return "Keshav uses Git for version control and maintains his projects on GitHub. You can check out his repositories at https://github.com/keshav3815 to see his coding style and contributions.";
    }

    // Experience and background
    if (msg.includes('experience') || msg.includes('background') || msg.includes('work experience')) {
        return "Keshav has hands-on experience across full-stack web development, applied Generative AI, and Web3. He's built an AI-powered learning platform, a community NGO platform, and a corporate website, and enjoys taking on challenging, real-world projects.";
    }

    if (msg.includes('education') || msg.includes('degree') || msg.includes('study') || msg.includes('college')) {
        return "Keshav is pursuing a Bachelor of Engineering in Computer Science at Chandigarh University, India (2022–2026). He continuously expands his knowledge through certifications (NPTEL, SWAYAM, Infosys Springboard) and hands-on projects, and believes in lifelong learning.";
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
    if (msg.includes('skill') || msg.includes('technology') || msg.includes('programming') || msg.includes('expertise') || msg.includes('stack') || msg.includes('tech')) {
        return "Keshav's stack spans four areas: Frontend (Next.js, React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui), Backend (FastAPI, Python, REST APIs, WebSockets, SSE streaming), AI (LangChain, LlamaIndex, Ollama, OpenAI, Google Gemini, vLLM, MCP, AI agents, RAG, multi-agent systems), and Web3 (Solidity, Hardhat, Ethers.js, MetaMask, smart contracts, NFTs, DeFi, DAOs) — plus live crypto data via CoinGecko, CoinMarketCap, Binance, and TradingView.";
    }

    // Projects general
    if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
        return "Keshav has worked on several exciting projects including Freequademy (an AI-powered learning platform with a RAG chatbot), the TRV Technologies LLP corporate website, and APC (a community & NGO engagement platform). Check out his projects section here: <a href='#projects'>Projects</a>.";
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
