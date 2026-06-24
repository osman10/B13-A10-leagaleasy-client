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

  if (session.user.role !== "Client") {
    redirect("/unauthorized");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/clients/${session.user.id}`,
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

  const client = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-center">

          <img
            src={client.profileImage || client.image}
            alt="profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white object-cover"
          />

          <h1 className="mt-4 text-2xl font-bold text-white">
            {client.name}
          </h1>

          <p className="text-blue-100">{client.role}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Email</span>
            <span className="font-semibold text-gray-900">
              {client.email}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Phone</span>
            <span className="font-semibold text-gray-900">
              {client.phone || "Not provided"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Address</span>
            <span className="font-semibold text-gray-900">
              {client.address || "Not provided"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Email Verified</span>

            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                client.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {client.emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Joined</span>
            <span className="font-semibold text-gray-900">
              {client.createdAt
                ? new Date(client.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>

          {/* Optional debug (remove in production) */}
          {/* <pre>{JSON.stringify(client, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default page;