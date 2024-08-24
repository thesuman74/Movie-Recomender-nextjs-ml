"use client";
import React from "react";

const AddPost = () => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // console.log("Form data destructured:", { title, content });

    try {
      const response = fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      // Clear the form data after submitting
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Add post</h1>
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4 ">
          <label>
            Title:
            <input type="text" name="title" className="text-black" />
          </label>
          <br />
          <label>
            Content:
            <input type="text" name="content" className="text-black" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
