"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function LawyerHiringList() {
  const { data: session } = useSession();

  const [hiring, setHiring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const lawyerId = session?.user?.id;

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchHiring = async () => {
      if (!lawyerId) return;

      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info/${lawyerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setHiring(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHiring();
  }, [lawyerId]);

  // ---------------- UPDATE STATUS ----------------
  const updateStatus = async (id, status) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update status");
      }

      // Update UI instantly
      setHiring((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error("Update error:", error.message);
    }
  };

  // ---------------- FILTER ----------------
  const filteredData =
    filter === "All"
      ? hiring
      : hiring.filter((item) => item.status === filter);

  // ---------------- SUMMARY ----------------
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
    (sum, item) =>
      sum + Number(item?.lawyerConsultationFee ?? 0),
    0
  );

  // ---------------- LOADING ----------------
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

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
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No hiring requests found
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

                      <div>
                        <p className="font-medium text-gray-800">
                          {item.lawyerName}
                        </p>

                        <p className="text-xs text-gray-500">
                          Client ID: {item.clientId}
                        </p>
                      </div>
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
                      item?.lawyerConsultationFee ?? 0
                    ).toLocaleString()}
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

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(item._id, "Approved")
                        }
                        disabled={item.status === "Approved"}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item._id, "Rejected")
                        }
                        disabled={item.status === "Rejected"}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}