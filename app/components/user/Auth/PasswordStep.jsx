// PasswordStep.jsx
"use client";

import { FiLock } from "react-icons/fi";

export default function PasswordStep({
  password,
  setPassword,
  handleLogin,
  loading,
  onSendOtp,
}) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Password
      </label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
        <FiLock className="text-gray-400 mr-2" size={20} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={!password || loading}
        className={`w-full py-3 rounded-md text-white font-semibold
          ${
            !password || loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* OTP Login Button */}
      <button
        onClick={onSendOtp}
        disabled={loading}
        className="w-full py-2 mt-3 border border-gray-600 rounded-md text-gray-600 font-semibold hover:bg-blue-50"
      >
        Login with OTP Instead
      </button>
    </div>
  );
}
