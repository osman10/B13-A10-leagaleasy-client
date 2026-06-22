"use client";

import { toast } from "react-toastify";

const HiringButton = ({ hiringInfo, token }) => {
  const handleHire = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hiring-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(hiringInfo),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      toast.success("Consultation booked successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <button
      onClick={handleHire}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
    >
      Book Consultation
    </button>
  );
};

export default HiringButton;