

const page = () => {
  return (
    <div>
          <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-wide">
          Dashboard Portal
        </h1>

        <div className="flex flex-col gap-5 w-72 mx-auto">
          <a
            href="/dashboard/admin"
            className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105"
          >
            Admin Dashboard
          </a>

          <a
            href="/dashboard/lawyer"
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105"
          >
            Lawyer Dashboard
          </a>

          <a
            href="/dashboard/client"
            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105"
          >
            Client Dashboard
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default page;