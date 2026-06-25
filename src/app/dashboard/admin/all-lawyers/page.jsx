"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function AllLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // ---------------- FETCH LAWYERS ----------------
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers`
        );

        const data = await res.json();
        setLawyers(data || []);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  // ---------------- UPDATE ROLE ----------------
  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // update UI instantly
      setLawyers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error("Role update error:", error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- DELETE LAWYER ----------------
  const deleteLawyer = async (id) => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this lawyer?"
      );
      if (!confirmDelete) return;

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setLawyers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return <p className="p-6">Loading lawyers...</p>;
  }

  if (lawyers.length === 0) {
    return (
      <p className="p-6">No lawyers found.</p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        All Lawyers
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lawyers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                {/* USER */}
                <td className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={user.image || "/avatar.png"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">
                    {user.name}
                  </span>
                </td>

                {/* EMAIL */}
                <td className="p-3 text-gray-600">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user._id,
                        e.target.value
                      )
                    }
                    disabled={updatingId === user._id}
                    className="border p-1 rounded"
                  >
                    <option value="Lawyer">
                      Lawyer
                    </option>
                    <option value="User">
                      User
                    </option>
                    <option value="Admin">
                      Admin
                    </option>
                  </select>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <button
                    onClick={() =>
                      deleteLawyer(user._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}