import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "Admin") {
    redirect("/unauthorized");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/admin/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    redirect("/error");
  }

  const admin = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-center">

          <img
            src={admin.profileImage || admin.image}
            alt="admin"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white object-cover"
          />

          <h1 className="mt-4 text-2xl font-bold text-white">
            {admin.name}
          </h1>

          <p className="text-sky-100">{admin.role}</p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* Email */}
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Email</span>
            <span className="font-semibold text-gray-900">
              {admin.email}
            </span>
          </div>

          {/* Phone */}
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Phone</span>
            <span className="font-semibold text-gray-900">
              {admin.phone}
            </span>
          </div>

          {/* Address */}
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Address</span>
            <span className="font-semibold text-gray-900">
              {admin.address}
            </span>
          </div>

          {/* Email Verified */}
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Email Status</span>

            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                admin.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {admin.emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          {/* Created At */}
          <div className="flex justify-between">
            <span className="text-gray-500">Joined</span>
            <span className="font-semibold text-gray-900">
              {new Date(admin.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;