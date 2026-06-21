import Sidebar from "./Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 container mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Page content */}
        <main className="p-6 mt-4 md:mt-0 md:mt-0flex-1">{children}</main>
      </div>
    </div>
  );
}