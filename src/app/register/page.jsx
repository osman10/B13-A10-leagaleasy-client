"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);


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






const handleRegister = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
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
      callbackURL: "/",
    });

  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join us and start your journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300"
            />
          </div>

          {/* ✅ ROLE SELECT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              defaultValue="Client"
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="Client">Client</option>
              <option value="Lawyer">Lawyer</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0081E0] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-[#0081E0] hover:text-[#0066B3] font-medium"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;