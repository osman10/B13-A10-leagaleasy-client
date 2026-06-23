"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LawyerForm({ userId, lawyer }) {
  const [saveProfile, setSaveProfile] = useState("Save Profile");

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    bio: "",
    consultationFee: "",
    status: "Available",
    dateJoined: "",
    phone: "",
    profileImage: "",
    yearsOfExperience: "",
    education: [""],
    barLicenseNumber: "",
    languages: "",
    rating: "",
    totalCasesHandled: "",
    location: "",
  });

  const [uploading, setUploading] = useState(false);

  // ✅ Load lawyer data into form after fetch
  useEffect(() => {
    if (!lawyer) return;

    setForm({
      name: lawyer.name || "",
      specialization: lawyer.specialization || "",
      bio: lawyer.bio || "",
      consultationFee: lawyer.consultationFee || "",
      status: lawyer.status || "Available",
      dateJoined: lawyer.dateJoined || "",
      phone: lawyer.phone || "",
      profileImage: lawyer.profileImage || "",
      yearsOfExperience: lawyer.yearsOfExperience || "",
      education: lawyer.education?.length ? lawyer.education : [""],
      barLicenseNumber: lawyer.barLicenseNumber || "",
      languages: lawyer.languages || "",
      rating: lawyer.rating || "",
      totalCasesHandled: lawyer.totalCasesHandled || "",
      location: lawyer.location || "",
    });
  }, [lawyer]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Education handlers
  const handleEducationChange = (index, value) => {
    const updated = [...form.education];
    updated[index] = value;
    setForm((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, ""],
    }));
  };

  const removeEducation = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, education: updated }));
  };

  // Image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
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
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };


  

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
      const {data:tokenData} = await authClient.token();
      const token = tokenData.token;

    try {
      setSaveProfile("Saving...");

      const filteredData = Object.fromEntries(
        Object.entries(form).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.some((item) => item.trim() !== "");
          }
          return value !== "" && value !== null && value !== undefined;
        })
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Lawyer Profile Form
      </h2>

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
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-28"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="consultationFee"
            placeholder="Consultation Fee"
            value={form.consultationFee}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="dateJoined"
            value={form.dateJoined}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="yearsOfExperience"
            placeholder="Experience"
            value={form.yearsOfExperience}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <input
            type="number"
            name="totalCasesHandled"
            placeholder="Cases"
            value={form.totalCasesHandled}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <input
          type="text"
          name="barLicenseNumber"
          placeholder="Bar License Number"
          value={form.barLicenseNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="languages"
          placeholder="Languages"
          value={form.languages}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* Education */}
        <div>
          <label className="font-semibold">Education</label>

          {form.education.map((edu, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={edu}
                onChange={(e) =>
                  handleEducationChange(index, e.target.value)
                }
                className="flex-1 p-3 border rounded-lg"
              />

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="px-3 bg-red-500 text-white rounded-lg"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            + Add Education
          </button>
        </div>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-3 border rounded-lg mt-2"
        />

        {uploading && <p>Uploading...</p>}

        {form.profileImage && (
          <img
            src={form.profileImage}
            className="w-24 h-24 rounded-full mt-3 object-cover"
            alt="profile"
          />
        )}

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