"use client";

import { useState } from "react";

export default function LawyerForm() {
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

    // Handle basic input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Education dynamic fields
    const handleEducationChange = (index, value) => {
        const updated = [...form.education];
        updated[index] = value;
        setForm({ ...form, education: updated });
    };

    const addEducation = () => {
        setForm({ ...form, education: [...form.education, ""] });
    };

    const removeEducation = (index) => {
        const updated = form.education.filter((_, i) => i !== index);
        setForm({ ...form, education: updated });
    };

    // Image upload to imgbb
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
                setForm({ ...form, profileImage: data.data.url });
            }
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", form);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Lawyer Profile Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Specialization */}
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Bio */}
                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg h-28"
                />

                {/* Fee + Status */}
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

                {/* Date + Email */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="dateJoined"
                        value={form.dateJoined}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    />
{/* 
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    /> */}
                </div>

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Experience + Rating + Cases */}
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

                {/* Bar License */}
                <input
                    type="text"
                    name="barLicenseNumber"
                    placeholder="Bar License Number"
                    value={form.barLicenseNumber}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Languages */}
                <input
                    type="text"
                    name="languages"
                    placeholder="Languages (comma separated)"
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

                {/* Image Upload */}
                <div>
                    <label className="font-semibold">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-3 border rounded-lg mt-2"
                    />

                    {uploading && (
                        <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                    )}

                    {form.profileImage && (
                        <img
                            src={form.profileImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mt-3 object-cover"
                        />
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}