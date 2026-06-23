import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "./Sidebar";
import { getClient, } from "@/app/data/Data";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in
  if (!session?.user) {
    redirect("/login");
  }

  // Not a lawyer
  if (session.user.role !== "Client") {
    redirect("/unauthorized");
  }

  const sessionUserId = session.user.id;


  

  // Fetch lawyer data
  const client = await getClient(sessionUserId);

  return (
    <div className="min-h-screen flex bg-gray-100 container mx-auto">
      {/* Sidebar */}
      <Sidebar client={client} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 mt-4 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
};