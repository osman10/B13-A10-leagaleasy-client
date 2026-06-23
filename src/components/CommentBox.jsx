"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentBox({ lawyerId, userId, userImg }) {
  const [comment, setComment] = useState("");

  // comments state
  const [comments, setComments] = useState([]);

  // separate loading states
  const [loading, setLoading] = useState(true); // fetch
  const [posting, setPosting] = useState(false); // post

  // ---------------- FETCH COMMENTS ----------------
  const fetchComments = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/comment/${lawyerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch comments");
      }

      setComments(data.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lawyerId) fetchComments();
  }, [lawyerId]);

  // ---------------- POST COMMENT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setPosting(true);

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lawyerId,
            userId,
            comment,
            userImg,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ INSTANT UI UPDATE (NO RELOAD)
      const newComment = {
        _id: data.insertedId || Date.now().toString(),
        lawyerId,
        userId,
        userImg,
        comment,
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => [newComment, ...prev]);

      setComment("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPosting(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-8 border rounded-xl mt-2 shadow-sm">
      {/* INPUT */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          disabled={posting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {posting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* COMMENTS */}
      <div className="mt-6 space-y-4">
        {/* initial loading */}
        {loading && comments.length === 0 ? (
          <p className="mt-4">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="w-full p-2 bg-blue-100 rounded-sm">
            No comment yet.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 p-3 border rounded-md bg-gray-50"
            >
              <Image
                height={40}
                width={40}
                src={c.userImg || "/default-avatar.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="text-gray-800">{c.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}