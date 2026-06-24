"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentBox({ lawyerId, userId, userImg }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [isApproved, setIsApproved] = useState(false);
  const [checkingApproval, setCheckingApproval] = useState(true);

  // ---------------- CHECK APPROVAL ----------------
  const getApprovedHiring = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info/approved?lawyerId=${lawyerId}&clientId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to fetch approval status"
        );
      }

      setIsApproved(data?.data?.length > 0);
    } catch (error) {
      console.error("Approval check error:", error.message);
      setIsApproved(false);
    } finally {
      setCheckingApproval(false);
    }
  };

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
    if (lawyerId) {
      fetchComments();
    }
  }, [lawyerId]);

  useEffect(() => {
    if (lawyerId && userId) {
      getApprovedHiring();
    }
  }, [lawyerId, userId]);

  // ---------------- POST COMMENT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isApproved) {
      toast.error(
        "You can comment only after your consultation has been approved."
      );
      return;
    }

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

      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="p-8 border rounded-xl mt-2 shadow-sm">
      {/* COMMENT FORM */}
      {checkingApproval ? (
        <div className="mb-6">
          <p>Checking approval status...</p>
        </div>
      ) : isApproved ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            className="w-full border p-3 rounded"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            disabled={posting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="mb-6 p-3 bg-yellow-100 text-yellow-800 rounded">
          You can comment only after your hiring request has been approved.
        </div>
      )}

      {/* COMMENTS LIST */}
      <div className="mt-6 space-y-4">
        {loading && comments.length === 0 ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="w-full p-3 bg-blue-100 rounded">
            No comments yet.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 p-3 border rounded-md bg-gray-50"
            >
              <Image
                src={c.userImg || "/default-avatar.png"}
                alt="User"
                width={40}
                height={40}
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