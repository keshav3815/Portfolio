import React, { useState } from 'react';
import { Bot, Send, Sparkles, Terminal, CheckCircle } from 'lucide-react';

export const GeminiAgentDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'How can I help you today? Ask me to build, summarize, or orchestrate an AI workflow.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });

      const data = await res.json();
      const reply = data.text || 'Workflow executed successfully!';
      setHistory((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Simulated Agent Action: Processed request "${userMsg}". RAG context matched 3 vector docs. Execution complete.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950/90 rounded-xl border border-indigo-500/30 overflow-hidden text-slate-100 shadow-xl backdrop-blur-md">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-slate-400 font-mono text-[11px] flex items-center ml-2">
            <Terminal className="w-3 h-3 mr-1 text-indigo-400" /> ai-agent-preview.ts
          </span>
        </div>
        <span className="flex items-center text-[10px] text-emerald-400 font-mono">
          <CheckCircle className="w-3 h-3 mr-1" /> ACTIVE
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs font-sans">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center text-[10px] text-indigo-400 font-semibold mb-1">
                  <Sparkles className="w-3 h-3 mr-1" /> GenAI Swarm Agent
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-400 flex items-center space-x-2">
              <Bot className="w-3.5 h-3.5 animate-bounce" />
              <span>Thinking & processing vectors...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-2 bg-slate-900/80 border-t border-slate-800 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Build something amazing with AI..."
          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
