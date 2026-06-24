"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

export default function LawyerHiringList() {
  const { data: session } = useSession();
  const [hiring, setHiring] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setHiring(data.data || []);
      } catch (error) {
        console.error(error.message);
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
        throw new Error(data.message);
      }

      // ✅ update UI instantly
      setHiring((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error("Update error:", error.message);
    }
  };

  // ---------------- UI ----------------
  if (!lawyerId || loading) {
    return <p className="p-4">Loading...</p>;
  }

  if (hiring.length === 0) {
    return <p className="p-4">No hiring requests found.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Hiring Requests</h2>

      {hiring.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 md:items-center justify-between"
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <img
              src={item.lawyerImg}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />

            <div>
              <h3 className="font-semibold">{item.lawyerName}</h3>
              <p className="text-sm text-gray-600">
                {item.lawyerSpecialization}
              </p>

              <p className="text-xs text-gray-500">
                Client ID: {item.clientId}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`px-3 py-1 rounded-full text-white text-xs w-fit ${
              item.status === "Approved"
                ? "bg-green-500"
                : item.status === "Rejected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {item.status}
          </span>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(item._id, "Approved")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Approved
            </button>

            <button
              onClick={() => updateStatus(item._id, "Rejected")}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Rejected
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}