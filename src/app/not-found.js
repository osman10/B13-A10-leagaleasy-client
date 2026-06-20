import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="text-6xl mb-4">⚖️</div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

        </div>

        {/* Small hint */}
        <p className="text-sm text-gray-400 mt-6">
          If you think this is a mistake, check the URL and try again.
        </p>

      </div>
    </div>
  );
}