"use client";
import { FiShield } from "react-icons/fi";

export default function OtpStep({ otp, setOtp, handleOtpLogin, loading }) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <label className="block mb-2 text-sm font-semibold text-gray-700">Enter OTP</label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <FiShield className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button
        onClick={handleOtpLogin}
        disabled={!otp || loading}
        className={`mt-5 w-full py-3 rounded-md text-white font-semibold
          ${!otp || loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
        `}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
