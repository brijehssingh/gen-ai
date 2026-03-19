import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function Chat() {
  const [role, setRole] = useState("doctor");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ⬅ Back
  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://gen-ai-9gns.onrender.com/api/chat", // ✅ FIXED
        {
          role,
          question: userMsg.text,
        }
      );

      const botMsg = {
        type: "bot",
        text: res.data.answer,
        image: res.data.imageUrl,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Server error. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-base-200">
      
      {/* 🔥 HEADER */}
      <div className="navbar bg-base-100 shadow-sm z-10 px-4 md:px-8 border-b border-base-300">
        <div className="navbar-start">
          <button onClick={handleBack} className="btn btn-ghost btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
        
        <div className="navbar-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-xl font-bold hidden sm:block">AI Assistant</h2>
        </div>

        <div className="navbar-end gap-2 md:gap-4">
          <div className="form-control">
            <select
              className="select select-bordered select-sm w-full max-w-xs focus:outline-primary"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="doctor">🩺 Doctor</option>
              <option value="teacher">🍎 Teacher</option>
              <option value="gym">🏋️ Gym Coach</option>
            </select>
          </div>
          <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm" title="Logout">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>

      {/* 💬 CHAT CONTAINER */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4">
        
        {/* Welcome Message if empty */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50 space-y-4 opacity-70">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
             <p className="text-lg">Start a conversation with your {role}...</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat animate-fade-in-up ${
              msg.type === "user" ? "chat-end" : "chat-start"
            }`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="w-10 rounded-full bg-base-300 flex items-center justify-center border border-base-content/10 p-2">
                {msg.type === "user" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )}
              </div>
            </div>
            
            {/* Chat Bubble */}
            <div className={`chat-bubble shadow-sm ${
              msg.type === "user" 
                ? "chat-bubble-primary text-primary-content" 
                : "bg-base-100 text-base-content border border-base-300"
            }`}>
              {msg.type === "user" ? (
                <p className="text-[15px]">{msg.text}</p>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none text-current">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}

              {msg.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-base-300 shadow-sm">
                  <img src={msg.image} alt="AI Generated" className="max-w-xs md:max-w-md w-full h-auto" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="chat chat-start animate-pulse">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full bg-base-300 flex items-center justify-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <div className="chat-bubble bg-base-100 border border-base-300 flex items-center h-12">
              <span className="loading loading-dots loading-md text-base-content/50"></span>
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* ✍ INPUT AREA */}
      <div className="bg-base-100 p-4 border-t border-base-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mx-auto flex gap-3 relative"
        >
          <input
            type="text"
            className="input input-bordered w-full pr-16 bg-base-200 focus:bg-base-100 focus:border-primary transition-colors shadow-inner"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask the ${role}...`}
            disabled={loading}
          />

          <button 
            type="submit" 
            className="btn btn-primary absolute right-1 top-1 bottom-1 min-h-0 h-10 w-12 p-0"
            disabled={loading || !question.trim()}
          >
            {loading ? (
               <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}