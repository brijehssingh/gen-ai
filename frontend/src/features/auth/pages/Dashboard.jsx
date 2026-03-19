import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* 🚀 Navbar */}
      <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
        <div className="flex-1">
          <a className="text-2xl font-black tracking-tight text-primary">AI.PORTAL</a>
        </div>
        <div className="flex-none gap-2">
          {/* Avatar / Profile placeholder */}
          <div className="dropdown dropdown-end">
            <button 
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-error normal-case"
            >
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 lg:p-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Welcome back! 👋</h1>
          <p className="text-base-content/60">Choose a tool below to get started with your workflow.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Resume Card */}
          <div 
            onClick={() => navigate("/resume")}
            className="group card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:border-primary border border-transparent transition-all duration-300 overflow-hidden"
          >
            <div className="card-body p-8">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="badge badge-outline text-xs uppercase font-bold opacity-50">Tools</div>
              </div>
              <h2 className="card-title text-2xl mt-4">Resume Analyzer</h2>
              <p className="text-base-content/70 mt-2">Get instant feedback and score your CV against industry standards.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-circle btn-ghost group-hover:translate-x-1 transition-transform">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Chat Card */}
          <div 
            onClick={() => navigate("/chat")}
            className="group card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:border-secondary border border-transparent transition-all duration-300"
          >
            <div className="card-body p-8">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="badge badge-outline text-xs uppercase font-bold opacity-50">AI</div>
              </div>
              <h2 className="card-title text-2xl mt-4">Chat Assistant</h2>
              <p className="text-base-content/70 mt-2">Talk to our intelligent bot for advice, code help, or general queries.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-circle btn-ghost group-hover:translate-x-1 transition-transform">
                  →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}