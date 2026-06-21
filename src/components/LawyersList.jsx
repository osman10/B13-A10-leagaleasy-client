"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function LawyersList({ lawyers }) {
  const [search, setSearch] = useState("");
  const[loading, setLoading]=useState(false)

  const filteredLawyers = useMemo(() => {
    return lawyers?.filter((lawyer) =>
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Find Your Favorite Lawyers
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, specialization, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLawyers?.map((lawyer) => (
          <div
            key={lawyer._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
          >
            {/* Image */}
            <img
              src={lawyer.profileImage}
              alt={lawyer.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              {/* Name */}
              <h2 className="text-xl font-bold text-gray-800">
                {lawyer.name}
              </h2>

              {/* Specialization */}
              <p className="text-blue-600 font-medium mt-1">
                {lawyer.specialization}
              </p>

              {/* Details */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {/* <p>
                  <span className="font-semibold">License:</span>{" "}
                  {lawyer.barLicenseNumber}
                </p>

                <p>
                  <span className="font-semibold">Experience:</span>{" "}
                  {lawyer.yearsOfExperience} Years
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {lawyer.location}
                </p>

                <p>
                  <span className="font-semibold">Rating:</span>{" "}
                  ⭐ {lawyer.rating}
                </p>

                <p>
                  <span className="font-semibold">Consultation Fee:</span>{" "}
                  ${lawyer.consultationFee}
                </p> */}

                <p>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      lawyer.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lawyer.status}
                  </span>
                </p>
              </div>

              {/* Dynamic Link */}
              <Link
                href={`/browse-lawyers/${lawyer._id}`}
                className="mt-5 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredLawyers?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No lawyers found.
        </p>
      )}
    </div>
  );
}