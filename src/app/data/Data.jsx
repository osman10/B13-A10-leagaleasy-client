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

// Get single admin 
export async function getAdmin(sessionUserId) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/admin/${sessionUserId}`,
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





//Get all lawyers
export async function getLawyers() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/lawyers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch lawyers");
  }

  return res.json();
};


// Get single Lawyers
export async function getLawyer(sessionUserId) {
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

// Get single clients
export async function getClient(sessionUserId) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.SERVER_URL}/clients/${sessionUserId}`,
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


// Get single approved hiring info 
export async function getApprovedHiring(lawyerId, clientId, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info/approved?lawyerId=${lawyerId}&clientId=${clientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // important for dynamic auth data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch approved hiring info");
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("getApprovedHiring error:", error.message);
    return [];
  }
}

