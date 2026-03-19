import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [role, setRole] = useState("doctor");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 Auto scroll to the bottom when a new message appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ⬅ Back to dashboard
  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message to UI
    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    
    // Clear input and start loading
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        role,
        question: userMsg.text,
      });

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
        { type: "bot", text: "❌ **Error:** I encountered an issue connecting to the server. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 flex flex-col items-center font-sans selection:bg-primary selection:text-white">
      
      {/* 🚀 GLASSMORPHISM HEADER */}
      <div className="navbar bg-base-100/70 backdrop-blur-xl shadow-sm border-b border-white/10 px-4 py-3 sticky top-0 z-50 w-full flex justify-between">
        
        {/* Left: Back Button */}
        <div>
          <button
            className="btn btn-ghost btn-sm gap-2 normal-case hover:bg-base-200/50 transition-colors rounded-xl"
            onClick={handleBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline font-semibold">Dashboard</span>
          </button>
        </div>

        {/* Center: Title with Gradient Text */}
        <div className="hidden md:flex flex-col items-center">
          <h2 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2 drop-shadow-sm">
            🤖 AI Workspace
          </h2>
        </div>

        {/* Right: Role Selector & Logout (Joined Tool) */}
        <div>
          <div className="join shadow-md border border-base-300/50 bg-base-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <select
              className="select select-sm join-item border-none focus:outline-none font-bold bg-base-100/50 hover:bg-base-200 transition-colors"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="doctor">🧑‍⚕️ Doctor AI</option>
              <option value="teacher">👨‍🏫 Teacher AI</option>
              <option value="gym">🏋️ Trainer AI</option>
            </select>
            <button
              className="btn btn-sm btn-error join-item border-none text-white hover:brightness-110 px-4"
              onClick={handleLogout}
            >
              <span className="hidden sm:inline font-semibold">Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 💬 MAIN CHAT AREA */}
      <div className="flex-1 w-full max-w-4xl flex flex-col p-4 overflow-hidden relative">
        
        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto space-y-8 pb-6 pr-2 custom-scrollbar">
          
          {/* ✨ Premium Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full mt-12 animate-in fade-in zoom-in duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <div className="p-6 bg-base-100 border border-base-200 rounded-full shadow-2xl relative">
                  <span className="text-5xl">
                    {role === 'doctor' ? '🧑‍⚕️' : role === 'teacher' ? '👨‍🏫' : '🏋️'}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">How can I help you today?</h3>
              <p className="text-base-content/60 text-center max-w-md">
                You are currently chatting with your personalized <span className="font-bold text-primary capitalize">{role} Assistant</span>. Ask a question or request an image generation!
              </p>
            </div>
          )}

          {/* Render Messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`chat ${msg.type === "user" ? "chat-end" : "chat-start"} animate-in slide-in-from-bottom-3 fade-in duration-300`}>
              
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className={`w-10 rounded-full shadow-md border-2 ${msg.type === "user" ? "border-primary/30" : "border-base-300 bg-base-100"}`}>
                  <img 
                    src={msg.type === "user" ? "https://ui-avatars.com/api/?name=U&background=random&color=fff&bold=true" : "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"} 
                    alt="avatar" 
                    className={msg.type === "bot" ? "p-1.5" : ""}
                  />
                </div>
              </div>

              {/* Header (Name) */}
              <div className="chat-header text-xs mb-1 ml-1 font-bold opacity-60 uppercase tracking-widest">
                {msg.type === "user" ? "You" : `${role} AI`}
              </div>

              {/* Bubble Content */}
              <div className={`chat-bubble shadow-lg ${
                msg.type === "user" 
                  ? "bg-gradient-to-br from-primary to-primary-focus text-primary-content text-sm border-none shadow-primary/20" 
                  : "bg-base-100/90 backdrop-blur-sm text-base-content border border-base-300/50"
              }`}>
                
                {/* Text / Markdown Content */}
                {msg.type === "user" ? (
                  <p className="whitespace-pre-line leading-relaxed font-medium">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:mt-4 prose-headings:mb-2 prose-headings:text-primary prose-a:text-secondary prose-strong:text-base-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}

                {/* Optional Image Payload */}
                {msg.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-base-300/50 shadow-md bg-base-200 p-1">
                    <img
                      src={msg.image}
                      alt="AI Generated"
                      className="max-h-80 w-auto object-cover rounded-lg hover:scale-[1.02] transition-transform duration-300 cursor-zoom-in"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="chat chat-start animate-in fade-in duration-300">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border-2 border-base-300 bg-base-100 shadow-md p-1.5">
                  <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="ai loading" className="animate-pulse" />
                </div>
              </div>
              <div className="chat-bubble bg-base-100 border border-base-300 flex items-center px-5 py-3 shadow-md">
                <span className="loading loading-dots loading-md text-primary/70"></span>
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={bottomRef}></div>
        </div>

        {/* ✍ GLOWING FLOATING INPUT FORM */}
        <div className="mt-2 w-full pb-6 px-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 bg-base-100/80 backdrop-blur-xl p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 focus-within:ring-4 ring-primary/20 focus-within:border-primary/50 transition-all duration-300"
          >
            <input
              type="text"
              placeholder={`Ask the ${role} anything...`}
              className="input input-ghost flex-1 bg-transparent border-none focus:outline-none focus:bg-transparent px-5 font-medium w-full placeholder:text-base-content/40"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />

            <button 
              className={`btn btn-primary btn-circle shadow-lg shadow-primary/30 transition-all duration-300 ${question.trim() ? 'hover:scale-105 active:scale-95' : 'opacity-40 cursor-not-allowed'}`}
              disabled={loading || !question.trim()}
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm text-white"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Secured & Powered by AI</span>
          </div>
        </div>

      </div>
    </div>
  );
}