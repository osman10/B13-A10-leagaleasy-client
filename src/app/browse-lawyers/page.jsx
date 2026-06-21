export default async function Page() {
  const res = await fetch(`${process.env.SERVER_URL}/lawyers`, {
    cache: "no-store",
  });

  const lawyers = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Lawyers
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lawyers?.map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {lawyer.name}
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Speciality:</span>{" "}
                {lawyer.speciality}
              </p>

              <p>
                <span className="font-medium">Experience:</span>{" "}
                {lawyer.experience} years
              </p>

              <p>
                <span className="font-medium">Location:</span>{" "}
                {lawyer.location}
              </p>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}