import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await loginUser({
        email,
        password,
      });

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
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      {/* Background light effects */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl animate-pulse" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl animate-pulse" />

      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-1 shadow-2xl shadow-purple-500/20 backdrop-blur-2xl">
          <form
            onSubmit={handleLogin}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                />
                <circle cx="9" cy="7" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 8v6M22 11h-6"
                />
              </svg>
            </div>

            <div className="mb-8 text-center">
              <h1 className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-3xl font-bold text-transparent">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Login to continue to your dashboard
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

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <div className="group relative">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16v16H4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4 6 8 6 8-6"
                  />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/10"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-7">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="group relative">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="10"
                    rx="2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10V7a4 4 0 018 0v3"
                  />
                </svg>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/10"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

              <span className="relative flex items-center justify-center gap-3">
                {loading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {loading ? "Logging in..." : "Login"}
              </span>
            </button>

            {/* Signup link */}
            <p className="mt-7 text-center text-sm text-slate-400">
              Don&apos;t have an account?

              <Link
                to="/signup"
                className="ml-1 font-semibold text-purple-400 transition hover:text-purple-300 hover:underline"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-slate-600">
          Secure authentication powered by JWT
        </p>
      </div>
    </div>
  );
};

export default Login;