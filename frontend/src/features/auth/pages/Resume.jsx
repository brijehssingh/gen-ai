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
      setResult("❌ Error analyzing resume");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleBack} className="btn btn-outline">
          ⬅ Back
        </button>

        <h2 className="text-xl font-bold">📄 Resume Analyzer</h2>

        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </div>

      <div className="flex justify-center">
        <div className="card w-full max-w-3xl bg-base-100 shadow-lg">
          <div className="card-body">

            {/* Upload */}
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="text-sm mt-2 text-gray-500">
                Selected: {file.name}
              </p>
            )}

            {/* Button */}
            <button
              className="btn btn-primary mt-4"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Resume 🚀"}
            </button>

            {/* Result */}
            {result && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Result</h3>
                <div className="bg-base-200 p-4 rounded mt-2 whitespace-pre-line">
                  {result}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}