"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-blue-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.  
          Please contact your administrator if you believe this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-[#0081E0] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Back to Home
          </button>

          <Link
            href="/login"
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 rounded-lg transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}