"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = ({redirect}) => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: `${redirect}`,
    });

    if (result?.error) {
      toast.error(result.error.message || "Login failed");
      return;
    }

    toast.success("Logged in successfully");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.message ||
      error?.error?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Google sign in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to access your account
          </p>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 outline-none focus:ring-2 focus:ring-[#0081E0] focus:border-[#0081E0] transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 outline-none focus:ring-2 focus:ring-[#0081E0] focus:border-[#0081E0] transition"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0081E0] hover:text-[#0066B3]"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-[#0081E0] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        Google Login
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 font-medium transition-all hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2c-2.1 1.6-4.7 2.5-7.3 2.5-5.3 0-9.7-3.3-11.3-8H6.4C9.7 39.5 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.6 5.5-6.9 6.8l6.3 5.2C38.6 36.4 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
            />
          </svg>

          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 text-[#0081E0] hover:text-[#0066B3] font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;