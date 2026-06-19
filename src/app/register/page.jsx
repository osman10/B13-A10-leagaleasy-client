"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    role: "",
    email: "",
    password: "",
    general: "",
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const validateForm = (form) => {
    const newErrors = {};

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;
    const imageFile = form.image.files[0];

    if (!name) newErrors.name = "Full name is required";
    else if (name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!imageFile) newErrors.image = "Profile image is required";
    else if (!imageFile.type.startsWith("image/"))
      newErrors.image = "Only image files are allowed";

    if (!["Client", "Lawyer"].includes(role))
      newErrors.role = "Please select a valid role";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Min 8 characters required";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Add at least 1 uppercase letter";
    else if (!/[a-z]/.test(password))
      newErrors.password = "Add at least 1 lowercase letter";
    else if (!/[0-9]/.test(password))
      newErrors.password = "Add at least 1 number";

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(e.target);

    if (Object.keys(formErrors).length > 0) {
      setErrors({
        name: formErrors.name || "",
        image: formErrors.image || "",
        role: formErrors.role || "",
        email: formErrors.email || "",
        password: formErrors.password || "",
        general: "",
      });
      return;
    }

    setErrors({
      name: "",
      image: "",
      role: "",
      email: "",
      password: "",
      general: "",
    });

    try {
      setLoading(true);

      const name = e.target.name.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const role = e.target.role.value;
      const imageFile = e.target.image.files[0];

      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await authClient.signUp.email({
        email,
        password,
        name,
        image: imageUrl,
        role,
      });

      window.location.href = "/login";
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error?.message || "Registration failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join us and start your journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 placeholder:text-gray-400"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder:text-gray-400"
            />
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">
                {errors.image}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              defaultValue="Client"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder:text-gray-400"
            >
              <option value="Client">Client</option>
              <option value="Lawyer">Lawyer</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">
                {errors.role}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 placeholder:text-gray-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {errors.general}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0081E0] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-[#0081E0] font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;