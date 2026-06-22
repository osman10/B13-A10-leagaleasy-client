import LawyerForm from '@/components/LawyerForm';
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      const userId = session?.user.id;
  
    
      // Not logged in
      if (!session?.user) {
        redirect("/login");
      }
    
      // Not a lawyer
      if (session.user.role !== "Lawyer") {
        redirect("/unauthorized");
      }
    
      // get token
     const { token } = await auth.api.getToken({
        headers: await headers(),
      });
    // Fetch lawyer data
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
        <div>
            <LawyerForm lawyer={lawyer} userId={userId}/>
        </div>
    );
};

export default page;