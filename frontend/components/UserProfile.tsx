import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const UserProfile = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image || "/default.png"; // Provide a default image path

  const progressData = [
    { label: "Action", value: 60, color: "red-500" },
    { label: "Thriller", value: 20, color: "green-500" },
    { label: "Sci-Fi", value: 20, color: "sky-500" },
  ];

  return (
    <div className="max-w-7xl flex shadow-lg rounded-lg overflow-hidden   border border-gray-900 gap-2  ">
      {/* <!-- Left section for the profile image and greetings --> */}
      <div className="w-[30%] bg-purple-800  text-white p-4 flex flex-col items-center justify-center rounded-lg ">
        <div className="border-2 border-white rounded-full size-44 flex items-center justify-center overflow-hidden bg-red-100">
          <img
            src={userImage}
            alt="User Image"
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-2 text-2xl md:text-lg ">👋Hi,{userName}</h2>
        <p>A short Placeholder</p>
      </div>

      {/* <!-- Right section for user details --> */}
      <div className="w-[70%] p-4 bg-purple-900 text-white rounded-lg">
        <div className="flex flex-col mx-10">
          <h2 className="font-semibold text-xl mb-2">Name: Suman Adhikari</h2>
          <p className="mt-2">Current Mood: Neutral</p>
          <p className="mt-2">Preferred Genre:</p>
          <div className="flex mt-2 justify-between mx-20">
            {progressData.map((item, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-full mx-3 border border-opacity-40"
              >
                <svg viewBox="0 0 36 36" className="w-24 h-24">
                  <path
                    className="text-gray-300"
                    strokeWidth="3.8"
                    d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                  />
                  <path
                    className={`stroke-current text-${item.color}`}
                    strokeWidth="3.8"
                    stroke-dasharray={`${item.value}, 100`}
                    d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-${item.color}">
                  {item.value}%
                  <span className="text-xs block">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-orange-500 mt-5 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-28">
            Favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
