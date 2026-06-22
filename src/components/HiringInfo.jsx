
"use client";

import Image from "next/image";
import { useState } from "react";

const HiringInfo = ({ hiringInfo = [] }) => {
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? hiringInfo
      : hiringInfo.filter((item) => item.status === filter);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Hiring Requests</h2>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Lawyer</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Fee</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">

                  {/* Lawyer */}
                  <td className="p-3 flex items-center gap-3">
                    <Image
                      src={item.lawyerImg}
                      alt={item.lawyerName}
                        height={40}
                        width={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">
                      {item.lawyerName}
                    </span>
                  </td>

                  {/* Specialization */}
                  <td className="p-3">
                    {item.lawyerSpecialization}
                  </td>

                  {/* Fee */}
                  <td className="p-3 font-semibold text-green-600">
                    ${item.lawyerConsultationFee}
                  </td>

                  {/* Date */}
                  <td className="p-3 text-sm text-gray-600">
                    {item.date}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default HiringInfo;