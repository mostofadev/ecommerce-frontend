"use client";
import { FiMail } from "react-icons/fi";

export default function EmailStep({ email, setEmail, handleNext, loading }) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg ">
      <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
        <FiMail className="text-gray-400 mr-2" size={20} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!email || loading}
        className={`mt-5 w-full py-3 rounded-md text-white font-semibold
          ${!email || loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? "Loading..." : "Continue"}
      </button>
    </div>
  );
}
