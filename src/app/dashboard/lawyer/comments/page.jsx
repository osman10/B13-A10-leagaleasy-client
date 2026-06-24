"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

export default function LawyerComments() {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Get session (lawyerId) + token
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authClient.getSession();
        const { data: tokenData } = await authClient.token();

        setLawyerId(session?.data?.user?.id || "");
        setToken(tokenData?.token || "");
      } catch (err) {
        console.error("Auth error:", err);
      }
    };

    initAuth();
  }, []);

  // 2. Fetch comments by lawyerId
  useEffect(() => {
    if (!lawyerId || !token) return;

    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/comment/${lawyerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setComments(data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [lawyerId, token]);

  // 3. Delete comment
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/comment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 4. UI
  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-4">
      {comments.length === 0 && <p className="text-4xl text-slate-700">No comments found.</p>}
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">
          Clients Comments.
        </h1>
        <div class="mx-auto mt-3 h-1 w-24 rounded bg-blue-600"></div>
      </div>

      {comments.map((c) => (
        <div
          key={c._id}
          className="flex items-center gap-3 p-3 border rounded-lg"
        >
          <Image
            src={c.userImg || "/avatar.png"}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="flex-1">
            <p className="text-sm">{c.comment}</p>

            <small className="text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </small>
          </div>

          <button
            onClick={() => handleDelete(c._id)}
            className="bg-red-500 hover:bg-red-600 cursor-pointer py-1 px-3 rounded-full text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}