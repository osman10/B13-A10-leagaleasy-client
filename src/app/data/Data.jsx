import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";




//Get all admins
export async function getAdmins() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/admin`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch admins");
  }

  return res.json();
}


// Get single Lawyers
export async function getLawyers(sessionUserId) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/lawyers/${sessionUserId}`,
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
  return res.json();
};

// Get all clients
export async function getClients() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/clients`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }

  return res.json();
};












// Get all heiring info 
export async function getHiringInfo() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch hiring info");
  }
  return res.json();
}