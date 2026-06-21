import LoginPage from "@/components/LoginPage";
import { getUserSession } from "@/lib/core/session";
import Image from "next/image";

const Page = async ({ params }) => {
  const { id } = await params;

  const session = await getUserSession();
  const redirect = `/browse-lawyers/${id}`

  // Not logged in
  if (!session) {
    return <LoginPage redirect={redirect}/>;
  }


  const res = await fetch(
    `${process.env.SERVER_URL}/lawyers/${id}`,
    {
      cache: "no-store",
    }
  );

  const lawyer = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-[#0081E0] p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              width={300}
              height={200}
              src={lawyer.profileImage}
              alt={lawyer.name}
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
            />

            <div>
              <h1 className="text-4xl font-bold">{lawyer.name}</h1>
              <p className="text-xl mt-2">{lawyer.specialization}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  ⭐ {lawyer.rating}
                </span>

                <span
                  className={`px-3 py-1 rounded-full ${
                    lawyer.status === "Available"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {lawyer.status}
                </span>

                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {lawyer.yearsOfExperience} Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Professional Information
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Bar License:</strong>{" "}
                  {lawyer.barLicenseNumber}
                </p>

                <p>
                  <strong>Location:</strong> {lawyer.location}
                </p>

                <p>
                  <strong>Consultation Fee:</strong> $
                  {lawyer.consultationFee}
                </p>

                <p>
                  <strong>Cases Handled:</strong>{" "}
                  {lawyer.totalCasesHandled}
                </p>

                <p>
                  <strong>Date Joined:</strong>{" "}
                  {lawyer.dateJoined}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">
                  Languages
                </h3>

                <div className="flex flex-wrap gap-2">
                  {lawyer.languages}
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Email:</strong> {lawyer.email}
                </p>

                <p>
                  <strong>Phone:</strong> {lawyer.phone}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">
                  Education
                </h3>

                <ul className="space-y-2">
                  {lawyer.education?.map((edu, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-3 rounded-lg"
                    >
                      🎓 {edu}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">
              About Lawyer
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {lawyer.bio}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Book Consultation
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;