import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "./Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in
  if (!session?.user) {
    redirect("/login");
  }

  // Not a lawyer
  if (session.user.role !== "Lawyer") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen flex bg-gray-100 container mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Page content */}
        <main className="flex-1 p-6 mt-4 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}