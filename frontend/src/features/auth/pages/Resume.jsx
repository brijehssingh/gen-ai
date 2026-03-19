import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ⬅ Back
  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "https://gen-ai-9gns.onrender.com/api/analyze-resume", // ✅ FIXED
        formData
      );

      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setResult("❌ Error analyzing resume. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-8 px-4">
      
      {/* 🔥 HEADER (Navbar Style) */}
      <div className="navbar bg-base-100 w-full max-w-4xl rounded-box shadow-sm mb-8 px-4">
        <div className="navbar-start">
          <button onClick={handleBack} className="btn btn-ghost gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </button>
        </div>
        <div className="navbar-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Resume Analyzer
          </h2>
        </div>
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm">
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-200/50">
        <div className="card-body p-6 md:p-10">
          
          <h3 className="text-lg font-semibold mb-4 text-center">Upload your resume to get AI-powered feedback</h3>

          {/* Upload Dropzone */}
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer bg-base-200/50 hover:bg-base-200 border-primary/50 hover:border-primary transition-all duration-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-base-content/80"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-base-content/60">PDF, DOCX, or TXT</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </label>
          ) : (
            /* Selected File State */
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl border border-base-300 mt-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-success/20 rounded-lg text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-semibold truncate">{file.name}</span>
                  <span className="text-xs text-base-content/60">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)} 
                className="btn btn-ghost btn-circle btn-sm text-error"
                title="Remove file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          {/* Action Button */}
          <button
            className="btn btn-primary w-full mt-6 shadow-md shadow-primary/20"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-md"></span>
                Analyzing Document...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Analyze Resume
              </>
            )}
          </button>

          {/* Result Section */}
          {result && (
            <div className="mt-8 animate-fade-in">
              <div className="divider text-primary font-medium text-sm">Analysis Complete</div>
              <div className="bg-base-200/70 p-6 rounded-xl border border-base-300 mt-4 relative shadow-inner">
                
                {/* Optional "Copy" button visual placeholder - purely aesthetic container */}
                <div className="prose prose-sm md:prose-base max-w-none whitespace-pre-line text-base-content/90 leading-relaxed">
                  {result}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}