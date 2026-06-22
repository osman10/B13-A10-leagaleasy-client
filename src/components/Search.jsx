"use client";

import { Magnifier } from "@gravity-ui/icons";
import { useEffect, useMemo, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers`
        );

        const data = await res.json();
        setLawyers(data);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) =>
      [
        lawyer.name,
        lawyer.specialization,
        lawyer.location,
        lawyer.barLicenseNumber,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [lawyers, search]);

  return (
    <div className="space-y-6">
      <div className="w-full md:max-w-md mx-auto">
        <div className="relative">
          <Magnifier className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name, specialization, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white border border-gray-200 rounded-2xl shadow-md transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300 hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;