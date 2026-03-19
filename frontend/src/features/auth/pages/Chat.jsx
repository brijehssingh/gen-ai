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
  }, [messages]);

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
    <div className="min-h-screen bg-base-200 flex flex-col items-center">

      {/* 🔥 HEADER */}
      <div className="navbar bg-base-100 shadow-md px-4 w-full flex justify-between">

        <button onClick={handleBack} className="btn btn-ghost btn-sm">
          ⬅ Back
        </button>

        <h2 className="text-xl font-bold">🤖 AI Chat</h2>

        <div className="flex gap-2">
          <select
            className="select select-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="doctor">Doctor</option>
            <option value="teacher">Teacher</option>
            <option value="gym">Gym</option>
          </select>

          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Logout
          </button>
        </div>
      </div>

      {/* 💬 CHAT */}
      <div className="w-full max-w-3xl h-[500px] overflow-y-auto bg-white p-4 mt-4 rounded shadow">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${
              msg.type === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              {msg.type === "user" ? (
                msg.text
              ) : (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              )}

              {msg.image && (
                <img src={msg.image} className="mt-2 rounded" />
              )}
            </div>
          </div>
        ))}

        {loading && <p>Typing...</p>}

        <div ref={bottomRef}></div>
      </div>

      {/* ✍ INPUT */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex gap-2 mt-4"
      >
        <input
          className="input input-bordered flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />

        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}