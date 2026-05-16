import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaPaperPlane, FaUser, FaTrash, FaSeedling } from "react-icons/fa";

const SYSTEM_PROMPT = `You are Kisan AI, an expert farming assistant for Indian and global farmers. You specialize in:
- Soil health, NPK levels, pH balance, and soil amendments
- Crop selection based on season, region, and soil type
- Plant disease identification and organic/chemical treatment options
- Fertilizer recommendations and application schedules
- Weather-based farming decisions and irrigation planning
- Pest management and prevention strategies
- Sustainable and organic farming practices
- Post-harvest storage and market advice

Keep answers practical, clear, and actionable. Use simple language since many farmers may not have technical backgrounds. When relevant, mention local Indian crop names and practices. Format responses with short paragraphs or bullet points for readability. Always be encouraging and supportive.`;

const SUGGESTIONS = [
  "What crop should I grow in sandy soil?",
  "My tomato leaves have yellow spots, what's wrong?",
  "Best fertilizer for rice cultivation?",
  "How to improve soil fertility naturally?",
  "When should I irrigate wheat crops?",
  "How to prevent fungal diseases in crops?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#4ade80", display: "inline-block",
          animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex", gap: 12,
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start", marginBottom: "1.25rem",
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem",
        background: isUser ? "rgba(74,222,128,0.12)" : "linear-gradient(135deg, #16a34a, #4ade80)",
        color: isUser ? "#4ade80" : "white",
        border: isUser ? "1px solid rgba(74,222,128,0.2)" : "none",
        boxShadow: isUser ? "none" : "0 0 16px rgba(74,222,128,0.2)",
      }}>
        {isUser ? <FaUser /> : <FaLeaf />}
      </div>
      <div style={{
        maxWidth: "75%",
        background: isUser ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isUser ? "rgba(74,222,128,0.18)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
        padding: "12px 16px",
        color: isUser ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.82)",
        fontSize: "0.9rem", lineHeight: 1.65,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("groq_api_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const hasKey = apiKey.trim().startsWith("gsk_");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!hasKey) setShowKeyInput(true);
  }, []);

  const saveKey = () => {
    const trimmed = keyDraft.trim();
    localStorage.setItem("groq_api_key", trimmed);
    setApiKey(trimmed);
    setShowKeyInput(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading || !hasKey) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "⚠️ Error: " + (err.message || "Something went wrong. Please check your API key."),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #041a0b 50%, #061208 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white", display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        .chat-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(5,20,10,0.6); backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 10;
        }

        .chat-brand { display: flex; align-items: center; gap: 10px; }

        .chat-brand-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          border-radius: 11px; display: flex; align-items: center;
          justify-content: center; font-size: 1rem; color: white;
          box-shadow: 0 0 16px rgba(74,222,128,0.3);
        }

        .chat-brand h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #4ade80; margin: 0;
        }

        .chat-brand span {
          font-size: 0.7rem; color: rgba(255,255,255,0.35);
          display: block; letter-spacing: 0.05em;
        }

        .groq-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.2);
          color: #fb923c; padding: 4px 10px; border-radius: 100px;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        .header-right { display: flex; align-items: center; gap: 8px; }

        .icon-btn {
          width: 34px; height: 34px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.4); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; transition: all 0.2s;
        }

        .icon-btn:hover {
          border-color: rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.06);
        }

        .messages-area {
          flex: 1; overflow-y: auto; padding: 2rem 1.5rem 1rem;
          max-width: 800px; width: 100%; margin: 0 auto; box-sizing: border-box;
        }

        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 50vh; text-align: center; gap: 1rem;
        }

        .empty-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, rgba(22,163,74,0.2), rgba(74,222,128,0.1));
          border: 1px solid rgba(74,222,128,0.2); border-radius: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; color: #4ade80;
          box-shadow: 0 0 40px rgba(74,222,128,0.1);
        }

        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 700; color: white;
        }

        .empty-title em { color: #4ade80; font-style: italic; }

        .empty-sub {
          color: rgba(255,255,255,0.35); font-size: 0.875rem;
          max-width: 340px; line-height: 1.6;
        }

        .suggestions {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; margin-top: 0.5rem; max-width: 560px;
        }

        .suggestion-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6); padding: 7px 14px;
          border-radius: 100px; font-size: 0.8rem; cursor: pointer;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }

        .suggestion-pill:hover {
          border-color: rgba(74,222,128,0.3);
          color: #4ade80; background: rgba(74,222,128,0.06);
        }

        .input-area {
          padding: 1rem 1.5rem 1.5rem;
          max-width: 800px; width: 100%; margin: 0 auto; box-sizing: border-box;
        }

        .input-box {
          display: flex; align-items: flex-end; gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px; padding: 10px 10px 10px 16px;
          transition: border-color 0.2s;
        }

        .input-box:focus-within { border-color: rgba(74,222,128,0.3); }

        .chat-textarea {
          flex: 1; background: none; border: none; outline: none;
          color: white; font-size: 0.925rem;
          font-family: 'DM Sans', sans-serif;
          resize: none; max-height: 120px; line-height: 1.5; padding: 4px 0;
        }

        .chat-textarea::placeholder { color: rgba(255,255,255,0.2); }

        .send-btn {
          width: 38px; height: 38px; flex-shrink: 0;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          border: none; border-radius: 11px; color: white;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-size: 0.875rem; transition: all 0.2s;
          box-shadow: 0 0 16px rgba(74,222,128,0.2);
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05); box-shadow: 0 0 24px rgba(74,222,128,0.35);
        }

        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .input-hint {
          text-align: center; font-size: 0.7rem;
          color: rgba(255,255,255,0.2); margin-top: 8px;
        }

        .key-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 1.5rem;
        }

        .key-modal {
          background: #0a1f0f; border: 1px solid rgba(74,222,128,0.15);
          border-radius: 24px; padding: 2.5rem;
          max-width: 460px; width: 100%; text-align: center;
        }

        .key-modal h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; color: white; margin-bottom: 0.5rem;
        }

        .key-modal > p {
          color: rgba(255,255,255,0.4); font-size: 0.875rem;
          line-height: 1.6; margin-bottom: 1.5rem;
        }

        .steps {
          text-align: left; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 1.5rem;
        }

        .steps p {
          margin: 0; padding: 6px 0; font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .steps p:last-child { border-bottom: none; }
        .steps a { color: #4ade80; }
        .steps strong { color: white; }

        .key-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 12px 16px; color: white; font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif; outline: none;
          box-sizing: border-box; margin-bottom: 1rem; transition: border-color 0.2s;
        }

        .key-input:focus { border-color: rgba(74,222,128,0.4); }

        .key-save-btn {
          width: 100%; background: linear-gradient(135deg, #16a34a, #4ade80);
          color: white; font-weight: 600; font-size: 0.95rem;
          padding: 13px; border-radius: 12px; border: none;
          cursor: pointer; transition: all 0.2s;
        }

        .key-save-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .key-save-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .key-note { margin-top: 1rem; font-size: 0.72rem; color: rgba(255,255,255,0.25); }
      `}</style>

      {/* API Key Modal */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div className="key-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="key-modal" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚡</div>
              <h3>Connect Groq — Free</h3>
              <p>Get your free Groq API key in 2 minutes. No credit card needed.</p>

              <div className="steps">
                <p>1. Go to <a href="https://console.groq.com" target="_blank" rel="noreferrer">console.groq.com</a></p>
                <p>2. Sign up free (Google / GitHub login works)</p>
                <p>3. Click <strong>API Keys</strong> → <strong>Create API Key</strong></p>
                <p>4. Copy the key starting with <strong>gsk_</strong> and paste below</p>
              </div>

              <input
                type="password"
                className="key-input"
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && keyDraft.trim().startsWith("gsk_") && saveKey()}
                autoFocus
              />
              <button
                className="key-save-btn"
                onClick={saveKey}
                disabled={!keyDraft.trim().startsWith("gsk_")}
              >
                🌱 Start Farming Chat
              </button>
              <p className="key-note">🔒 Saved only in your browser's localStorage — never sent anywhere else</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="chat-header">
        <div className="chat-brand">
          <div className="chat-brand-icon"><FaLeaf /></div>
          <div>
            <h2>Kisan AI</h2>
            <span>Smart Farming Assistant</span>
          </div>
        </div>
        <div className="header-right">
          <div className="groq-badge">⚡ Groq · Free</div>
          {messages.length > 0 && (
            <button className="icon-btn" onClick={() => setMessages([])} title="Clear chat">
              <FaTrash />
            </button>
          )}
          <button className="icon-btn" onClick={() => { setKeyDraft(apiKey); setShowKeyInput(true); }} title="Update key">
            🔑
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-area">
        {messages.length === 0 ? (
          <motion.div className="empty-state" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="empty-icon"><FaSeedling /></div>
            <h2 className="empty-title">Ask <em>Kisan AI</em></h2>
            <p className="empty-sub">Powered by Llama 3 on Groq — completely free. Ask anything about crops, soil, diseases or fertilizers.</p>
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="suggestion-pill" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  color: "white", fontSize: "0.85rem",
                  boxShadow: "0 0 16px rgba(74,222,128,0.2)",
                }}>
                  <FaLeaf />
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "4px 18px 18px 18px", padding: "12px 16px",
                }}>
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="input-area">
        <div className="input-box">
          <textarea
            ref={inputRef}
            className="chat-textarea"
            rows={1}
            placeholder="Ask about crops, soil, diseases, fertilizers..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading || !hasKey}
          >
            <FaPaperPlane />
          </button>
        </div>
        <p className="input-hint">Enter to send · Shift+Enter for new line · Powered by Llama 3 on Groq</p>
      </div>
    </div>
  );
}
