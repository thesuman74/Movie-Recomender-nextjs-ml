import React from "react";
import { useSelector } from "react-redux";
import { getTopGenres } from "@/lib/store/features/cart/FavouriteSlice";
import { RootState } from "@/lib/store/Store";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GenreCount from "./GenreCount";

const UserProfile = async () => {
  // const favouriteState = useSelector((state: RootState) => state.favourite);
  // const topGenres = getTopGenres(favouriteState);
  const session = await auth();

  if (!session?.user) redirect("/login");

  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image || "/default.png"; // Provide a default image path

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
          <p className="mt-2">Current Mood: Neutral</p>{" "}
          <p className="mt-2">Preferred Genres:</p>
          <GenreCount />
          <button className="bg-orange-500 mt-5 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-28">
            Favourites{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
