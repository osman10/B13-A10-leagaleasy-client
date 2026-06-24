"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function LawyerHiringList() {
  const { data: session } = useSession();
  const [hiring, setHiring] = useState([]);
  const [loading, setLoading] = useState(true);

  const clientId = session?.user?.id;
  console.log("Client Id is:", clientId)

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchHiring = async () => {
      if (!clientId) return;

      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/client-hiring-info/${clientId}`,
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
  }, [clientId]);


  // ---------------- UI ----------------
  if (!clientId || loading) {
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
            <Image
              height={48}
              width={48}
              src={item.lawyerImg}
              className="w-12 h-12 rounded-full object-cover"
              alt="Client image"
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
            className={`px-3 py-1 rounded-full text-white text-xs w-fit ${item.status === "Approved"
                ? "bg-green-500"
                : item.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}