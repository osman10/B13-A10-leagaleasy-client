"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateLawyer() {
  const { id } = useParams();
//   console.log("Editing lawyer with ID:", id);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    bio: "",
    consultationFee: "",
    status: "",
    email: "",
    phone: "",
    profileImage: "",
    yearsOfExperience: "",
    barLicenseNumber: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch lawyer data
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/lawyers/${id}`);
        const data = await res.json();

        setForm(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (id) fetchLawyer();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/lawyers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Lawyer updated successfully!");
        router.push("/lawyers");
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Update Lawyer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="specialization"
          value={form.specialization || ""}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          value={form.bio || ""}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="consultationFee"
          value={form.consultationFee || ""}
          onChange={handleChange}
          placeholder="Consultation Fee"
          className="w-full border p-2 rounded"
        />

        <input
          name="status"
          value={form.status || ""}
          onChange={handleChange}
          placeholder="Status"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        <input
          name="profileImage"
          value={form.profileImage || ""}
          onChange={handleChange}
          placeholder="Profile Image URL"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="yearsOfExperience"
          value={form.yearsOfExperience || ""}
          onChange={handleChange}
          placeholder="Years of Experience"
          className="w-full border p-2 rounded"
        />

        <input
          name="barLicenseNumber"
          value={form.barLicenseNumber || ""}
          onChange={handleChange}
          placeholder="Bar License Number"
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          value={form.location || ""}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Lawyer
        </button>
      </form>
    </div>
  );
}