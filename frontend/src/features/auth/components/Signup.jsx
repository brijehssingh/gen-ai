import React, { useState } from "react";
import { signupUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await signupUser({
        name,
        email,
        password,
      });

      // Redirect only when actual token is received
      if (response.data?.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        navigate("/dashboard");
      } else {
        setMessage("Token was not received");
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setMessage(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4 py-10">
      {/* Background effects */}
      <div className="absolute -left-32 -top-32 h-80 w-80 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-cyan-500/30 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-1 shadow-2xl shadow-purple-500/20 backdrop-blur-2xl">
          <form
            onSubmit={handleSignup}
            className="rounded-[22px] bg-slate-900/70 px-6 py-8 sm:px-10 sm:py-10"
          >
            {/* Logo */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 21a8 8 0 0116 0"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 4v6M22 7h-6"
                />
              </svg>
            </div>

            <div className="mb-7 text-center">
              <h1 className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-3xl font-bold text-transparent">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Start your journey with us today
              </p>
            </div>

            {/* Error message */}
            {message && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 font-bold">
                  !
                </span>

                <p>{message}</p>
              </div>
            )}

            {/* Name input */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/10"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/10"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-7">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/10"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={6}
              />
            </div>

            {/* Signup button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-3">
                {loading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </span>
            </button>

            {/* Login link */}
            <p className="mt-7 text-center text-sm text-slate-400">
              Already have an account?

              <Link
                to="/"
                className="ml-1 font-semibold text-purple-400 transition hover:text-purple-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-slate-600">
          Your information is securely protected
        </p>
      </div>
    </div>
  );
};

export default Signup;