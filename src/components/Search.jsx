"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/search?q=${query}`
      );

      const data = await res.json();

      setLoading(false);

      if (data && data.length > 0) {
        const firstLawyer = data[0];

        router.push(`/browse-lawyers/${firstLawyer._id}`);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lawyers..."
          className="px-3 py-1 rounded-md text-black w-52"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="absolute text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}