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
        question: userMsg.text, // use the saved text, not the state which just cleared
      });

      const botMsg = {
        type: "bot",
        text: res.data.answer,
        image: res.data.imageUrl,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      // Optional: Add an error message bubble if the API fails
      setMessages((prev) => [
        ...prev, 
        { type: "bot", text: "❌ Sorry, I encountered an error connecting to the server." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center font-sans">
      
      {/* 🚀 STICKY HEADER */}
      <div className="navbar bg-base-100 shadow-sm border-b border-base-300 px-4 py-3 sticky top-0 z-50 w-full flex justify-between">
        
        {/* Left: Back Button */}
        <div>
          <button
            className="btn btn-ghost btn-sm gap-2 normal-case hover:bg-base-200"
            onClick={handleBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </button>
        </div>

        {/* Center: Title */}
        <div className="hidden md:flex flex-col items-center">
          <h2 className="text-xl font-black tracking-tight text-primary flex items-center gap-2">
            🤖 AI Assistant
          </h2>
        </div>

        {/* Right: Role Selector & Logout (Joined Tool) */}
        <div>
          <div className="join shadow-sm border border-base-300 bg-base-100">
            <select
              className="select select-sm join-item border-none focus:outline-none font-semibold bg-base-100"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="doctor">🧑‍⚕️ Doctor</option>
              <option value="teacher">👨‍🏫 Teacher</option>
              <option value="gym">🏋️ Trainer</option>
            </select>
            <button
              className="btn btn-sm btn-error join-item border-none text-white hover:brightness-110 px-4"
              onClick={handleLogout}
            >
              <span className="hidden sm:inline">Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 💬 MAIN CHAT AREA */}
      <div className="flex-1 w-full max-w-4xl flex flex-col p-4 overflow-hidden relative">
        
        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-4 pr-2 custom-scrollbar">
          
          {/* Empty State / Greeting */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-base-content/40 mt-10">
              <div className="p-4 bg-base-300 rounded-full mb-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-lg font-bold">Start chatting with your {role}</p>
              <p className="text-sm opacity-70 mt-1">Ask questions or request AI images!</p>
            </div>
          )}

          {/* Render Messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`chat ${msg.type === "user" ? "chat-end" : "chat-start"}`}>
              
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border border-base-300 shadow-sm bg-base-100">
                  <img 
                    src={msg.type === "user" ? "https://ui-avatars.com/api/?name=U&background=0D8ABC&color=fff" : "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"} 
                    alt="avatar" 
                    className="p-1"
                  />
                </div>
              </div>

              {/* Header (Name) */}
              <div className="chat-header opacity-50 text-xs mb-1 ml-1 font-semibold uppercase tracking-wider">
                {msg.type === "user" ? "You" : `${role} AI`}
              </div>

              {/* Bubble Content */}
              <div className={`chat-bubble shadow-sm ${
                msg.type === "user" 
                  ? "chat-bubble-primary text-primary-content text-sm" 
                  : "bg-base-100 text-base-content border border-base-300"
              }`}>
                
                {/* Text / Markdown Content */}
                {msg.type === "user" ? (
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:mt-4 prose-headings:mb-2 prose-li:my-0">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}

                {/* Optional Image Payload */}
                {msg.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-base-300 shadow-sm">
                    <img
                      src={msg.image}
                      alt="AI Generated"
                      className="max-h-80 w-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border border-base-300 shadow-sm bg-base-100 p-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="ai loading" />
                </div>
              </div>
              <div className="chat-bubble bg-base-100 border border-base-300 flex items-center px-4 py-3 shadow-sm">
                <span className="loading loading-dots loading-md text-primary"></span>
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={bottomRef}></div>
        </div>

        {/* ✍ FLOATING INPUT FORM */}
        <div className="mt-2 w-full pb-4 px-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-base-100 p-2 rounded-full shadow-lg border border-base-300 focus-within:ring-2 ring-primary/30 transition-all"
          >
            <input
              type="text"
              placeholder={`Ask the ${role} anything...`}
              className="input input-ghost flex-1 bg-transparent border-none focus:outline-none focus:bg-transparent px-4 text-sm w-full"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />

            <button 
              className={`btn btn-primary btn-circle shadow-md transition-transform ${question.trim() ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
              disabled={loading || !question.trim()}
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}