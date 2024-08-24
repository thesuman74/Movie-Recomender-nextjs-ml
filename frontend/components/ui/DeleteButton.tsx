"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ postId }: { postId: string }) => {
  console.log("postId", postId);
  const router = useRouter();
  async function handleDelete() {
    try {
      await fetch(`api/post/${postId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {" "}
      <button
        className="px-4 py-1 rounded-xl border"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
