"use client";

import Image from "next/image";
import { useState } from "react";

const HiringInfo = ({ hiringInfo = [] }) => {
  const [filter, setFilter] = useState("All");

  // Filtered Data
  const filteredData =
    filter === "All"
      ? hiringInfo
      : hiringInfo.filter((item) => item.status === filter);

  // Summary Statistics (based on filtered data)
  const totalRequests = filteredData.length;

  const pendingCount = filteredData.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = filteredData.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedCount = filteredData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalConsultationFee = filteredData.reduce(
    (sum, item) => sum + Number(item.lawyerConsultationFee || 0),
    0
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Hiring Requests</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Requests</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {totalRequests}
          </h3>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-600">
            {pendingCount}
          </h3>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <h3 className="text-2xl font-bold text-green-600">
            {approvedCount}
          </h3>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <h3 className="text-2xl font-bold text-red-600">
            {rejectedCount}
          </h3>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            {filter === "All"
              ? "Total Fees"
              : `${filter} Fees`}
          </p>
          <h3 className="text-2xl font-bold text-purple-600">
            ${totalConsultationFee.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Lawyer</th>
              <th className="p-3 font-semibold">Specialization</th>
              <th className="p-3 font-semibold">Fee</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Lawyer */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.lawyerImg}
                        alt={item.lawyerName}
                        width={44}
                        height={44}
                        className="rounded-full object-cover aspect-square"
                      />
                      <span className="font-medium text-gray-800">
                        {item.lawyerName}
                      </span>
                    </div>
                  </td>

                  {/* Specialization */}
                  <td className="p-3 text-gray-700">
                    {item.lawyerSpecialization}
                  </td>

                  {/* Fee */}
                  <td className="p-3 font-semibold text-green-600">
                    $
                    {Number(
                      item.lawyerConsultationFee || 0
                    ).toLocaleString()}
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