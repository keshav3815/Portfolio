import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Gemini server-side proxy
  app.post('/api/gemini', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
        // Fallback intelligent response if key is default placeholder
        return res.json({
          text: `[AI Agent Response]\nReceived query: "${prompt || 'Build GenAI Product'}"\n\nSimulated RAG Context:\n• 3 Semantic document chunks retrieved (Relevance: 0.96)\n• Vector search executed via Pinecone vector index.\n• Sub-agent tool call executed: 200 OK\n\nResult: Architecture optimized for high throughput and low latency. Add your real GEMINI_API_KEY in secrets to enable live Gemini 1.5 Pro reasoning.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt || 'Explain how to design scalable 3D web applications with GenAI.',
        config: systemInstruction ? { systemInstruction } : undefined
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API error:', err);
      return res.status(500).json({
        error: err.message || 'Error generating AI content',
        text: 'Error interacting with AI agent backend.'
      });
    }
  });

  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
