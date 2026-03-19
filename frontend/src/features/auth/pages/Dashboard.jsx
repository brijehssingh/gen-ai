import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 font-sans selection:bg-primary selection:text-white relative overflow-hidden">
      
      {/* 🚀 GLASSMORPHISM HEADER */}
      <div className="navbar bg-base-100/70 backdrop-blur-xl shadow-sm border-b border-white/10 px-4 py-3 sticky top-0 z-50 w-full flex justify-between">
        <div className="flex-1">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2 drop-shadow-sm">
            AI.Workspace
          </span>
        </div>
        <div className="flex-none">
          <button 
            onClick={handleLogout} 
            className="btn btn-sm btn-error shadow-md shadow-error/20 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 rounded-full"
          >
            <span className="font-semibold">Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* 🌟 MAIN CONTENT */}
      <div className="container mx-auto px-6 py-12 max-w-5xl relative z-10">
        
        {/* Ambient Glowing Background Elements */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>

        {/* Welcome Text */}
        <div className="mb-12 text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-base-content tracking-tight">
            Welcome to your <span className="text-primary drop-shadow-sm">Dashboard</span>
          </h1>
          <p className="text-lg text-base-content/60 max-w-2xl font-medium">
            Select a tool below to optimize your workflow. All tools are powered by advanced AI models to boost your productivity.
          </p>
        </div>

        {/* 🎛️ TOOL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

          {/* 📄 Resume Analyzer Card */}
          <div
            onClick={() => navigate("/resume")}
            className="card bg-base-100/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
          >
            <div className="card-body p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner border border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors">Resume Analyzer</h2>
              <p className="text-base-content/60 font-medium leading-relaxed">
                Upload your PDF or Word CV for an instant AI-driven review. Get ATS scoring, formatting tips, and actionable feedback.
              </p>
              <div className="card-actions justify-end mt-6">
                <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-xs bg-primary/10 px-5 py-2.5 rounded-full group-hover:bg-primary group-hover:text-white shadow-sm">
                  Launch Tool 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* 🤖 Chat Assistant Card */}
          <div
            onClick={() => navigate("/chat")}
            className="card bg-base-100/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
          >
            <div className="card-body p-8">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-inner border border-secondary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl font-bold mb-2 text-base-content group-hover:text-secondary transition-colors">AI Chat Assistant</h2>
              <p className="text-base-content/60 font-medium leading-relaxed">
                Engage with specialized AI personas. Get expert advice, learning plans, or request custom image generations in seconds.
              </p>
              <div className="card-actions justify-end mt-6">
                <span className="text-secondary font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-xs bg-secondary/10 px-5 py-2.5 rounded-full group-hover:bg-secondary group-hover:text-white shadow-sm">
                  Launch Tool 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}