"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdmintForm({ userId, admin }) {
  const [saveProfile, setSaveProfile] = useState("Save Profile");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  // ✅ Load client data
  useEffect(() => {
    if (!admin) return;

    setForm({
      name: admin.name || "",
      phone: admin.phone || "",
      address: admin.address || "",
      profileImage: admin.profileImage || "",
    });
  }, [admin]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.data?.url) {
        setForm((prev) => ({
          ...prev,
          profileImage: data.data.url,
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaveProfile("Saving...");

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const filteredData = Object.fromEntries(
        Object.entries(form).filter(([_, value]) => value !== "")
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/client/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaveProfile("Save Profile");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-xl rounded-2xl">

      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Update Admin Profile
        </h1>
        <div className="mx-auto mt-3 h-1 w-24 rounded bg-blue-600"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />


        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-3 border rounded-lg"
        />

        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

        {form.profileImage && (
          <img
            src={form.profileImage}
            className="w-24 h-24 rounded-full object-cover mt-3"
            alt="profile"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          {saveProfile}
        </button>
      </form>
    </div>
  );
}