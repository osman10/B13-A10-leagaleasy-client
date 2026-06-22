import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "./Sidebar";

const Layout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in
  if (!session?.user) {
    redirect("/login");
  }

  // Not an admin
  if (session.user.role !== "Admin") {
    redirect("/unauthorized");
  }
const admin = 
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
};

export default Layout;