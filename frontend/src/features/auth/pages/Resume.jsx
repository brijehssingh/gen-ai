import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/analyze-resume", formData);
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* 🚀 Sticky Header */}
      <div className="navbar bg-base-100 shadow-sm px-4 lg:px-12 sticky top-0 z-50">
        <div className="flex-1">
          <button 
            onClick={() => navigate("/dashboard")}
            className="btn btn-ghost gap-2 normal-case"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        <div className="flex-none">
          <button onClick={handleLogout} className="btn btn-ghost text-error btn-sm">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Upload Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
          <div className="card-body items-center text-center py-10">
            <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="card-title text-3xl font-black mb-2">Resume Analyzer</h2>
            <p className="text-base-content/60 max-w-sm mb-6">
              Upload your PDF or Word document to get AI-powered feedback on your skills and formatting.
            </p>

            <div className="form-control w-full max-w-md">
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full shadow-sm"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={loading}
              />
              {file && (
                <label className="label">
                  <span className="label-text-alt text-success font-medium italic">✓ {file.name}</span>
                </label>
              )}
            </div>

            <button
              className={`btn btn-primary btn-wide mt-6 shadow-lg ${loading ? "loading" : ""}`}
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {!loading && "Analyze Resume"}
            </button>
          </div>
          
          {/* Progress bar for "thinking" feel */}
          {loading && <progress className="progress progress-primary w-full rounded-none"></progress>}
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="badge badge-primary badge-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Analysis
              </div>
              <h3 className="text-2xl font-bold">Deep Scan Results</h3>
            </div>

            <div className="mockup-window border border-base-300 bg-base-100 shadow-2xl">
              <div className="px-8 py-10 bg-base-50 text-base-content leading-relaxed whitespace-pre-line font-medium border-t border-base-300">
                {result}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={() => window.print()} 
                className="btn btn-outline btn-sm gap-2 opacity-50 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}