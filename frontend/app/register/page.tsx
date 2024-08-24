"use client";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { z } from "zod";

// Define the schema for form data validation
const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "You should enter Password"),
});

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      // Convert FormData into an object
      const formObject = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      // Validate form data against the schema
      formSchema.parse(formObject);

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Handle response if necessary
      router.push("/login");
      // Additional success handling logic here
      // For example, redirect the user or clear the form
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod provides an errors array with issue details
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        // Handle generic errors from fetch or other exceptions
        setErrors({ form: error.message });
      } else {
        // Catch-all for errors that are not instances of Error
        setErrors({ form: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false); // Ensure loading is set to false after the operations
    }
  }

  return (
    <div className="bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-10 xl:px-5">
        <div className="w-full max-w-md lg:max-w-2xl lg:w-7/12 pt-5 lg:pt-20 pb-20 pl-10 pr-10 flex flex-col items-center lg:flex-row">
          <div className="w-full h-full relative bg-cover">
            <img
              src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
              alt="Health Run"
              className="btn-"
            />
          </div>
        </div>
        <div className="w-full max-w-2xl lg:w-5/12 mt-20 lg:mt-0 relative z-10">
          <div className="bg-white shadow-2xl rounded-xl p-10 flex flex-col items-start space-y-8 relative z-10">
            <p className="w-full text-4xl font-medium font-serif text-center leading-snug">
              Sign up for an account
            </p>
            <form className="w-full" onSubmit={onSubmit}>
              <div className="w-full space-y-8">
                <div className="relative">
                  <p className="absolute -mt-3 ml-2 bg-white p-1 text-gray-600 font-medium">
                    Full Name
                  </p>
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    className="w-full mt-2 block bg-white border border-gray-300 rounded-md p-4 placeholder-gray-400 focus:outline-none focus:border-black text-base"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="relative">
                  <p className="absolute -mt-3 ml-2 bg-white p-1 text-gray-600 font-medium">
                    Email
                  </p>
                  <input
                    type="email"
                    placeholder="123@ex.com"
                    name="email"
                    // new line
                    className="w-full mt-2 block bg-white border border-gray-300 rounded-md p-4 placeholder-gray-400 focus:outline-none focus:border-black text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <p className="absolute -mt-3 ml-2 bg-white p-1 text-gray-600 font-medium">
                    Password
                  </p>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full block bg-white border border-gray-300 rounded-md p-4 placeholder-gray-400 focus:outline-none focus:border-black text-base"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white text-xl font-medium rounded-lg p-4 text-center transition duration-200 hover:bg-indigo-600 ease"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Register"}
                  </button>
                  {errors.form && (
                    <p className="text-red-500 text-sm mt-1">{errors.form}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
