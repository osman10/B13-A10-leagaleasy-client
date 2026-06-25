"use client";

import Loading from "@/components/Loading";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function ClientsTable() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);



    const fetchClients = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/clients`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setClients(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmDelete) return;

        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/client/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setClients((prev) =>
                prev.filter((client) => client._id !== id)
            );

            toast.success("Client Deleted Successfully");
        } catch (error) {
            toast.error(error.message || "Failed to delete client");
        }
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">All Clients</h2>

            <div className="space-y-4">
                {clients.map((client) => (
                    <div
                        key={client._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                height={64}
                                width={64}
                                src={
                                    client.image ||
                                    "https://i.ibb.co/4pDNDk1/avatar.png"
                                }
                                alt={client.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                            />

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {client.name}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    {client.email}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(client._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {clients.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No clients found
                    </div>
                )}
            </div>
        </div>
    );
}