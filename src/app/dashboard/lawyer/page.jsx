import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Image from "next/image";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "Lawyer") {
    redirect("/unauthorized");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/lawyers/${session.user.id}`,
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

  const lawyer = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">

          <Image
          height={112}
          width={112}
            src={lawyer.profileImage || lawyer.image}
            alt="lawyer"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white object-cover"
          />

          <h1 className="mt-4 text-2xl font-bold text-white">
            {lawyer.name}
          </h1>

          <p className="text-purple-100">
            {lawyer.specialization}
          </p>

          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-white text-purple-700">
            {lawyer.status}
          </span>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* Bio */}
          <p className="text-gray-600 italic">
            {lawyer.bio}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Email</span>
              <span className="font-semibold">{lawyer.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Phone</span>
              <span className="font-semibold">
                {lawyer.phone || "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Location</span>
              <span className="font-semibold">{lawyer.location}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Experience</span>
              <span className="font-semibold">
                {lawyer.yearsOfExperience} yrs
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Consultation Fee</span>
              <span className="font-semibold text-green-600">
                ${lawyer.consultationFee}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Rating</span>
              <span className="font-semibold text-yellow-500">
                ⭐ {lawyer.rating}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Cases Handled</span>
              <span className="font-semibold">
                {lawyer.totalCasesHandled}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Languages</span>
              <span className="font-semibold">
                {lawyer.languages}
              </span>
            </div>

          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;