import { auth } from "@/auth";
// import TrendingMovies from "@/components/ui/dashboard/TrendingMovies";

import { redirect } from "next/navigation";
import React from "react";
import Movies from "../Home/Movies";
import UserProfile from "@/components/UserProfile";
import FavouriteMovies from "../favourites/page";
import AllMovies from "../movies/page";
import AllMoviesList from "../movies/AllmoviesList";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="">
      {/* <UserHero /> */}
      <UserProfile />
      {/* <FavouriteMovies /> */}

      {/* <TrendingMovies /> */}
      <AllMoviesList />
      <Movies />
      {/* <AllMovies /> */}
    </div>
  );
};

export default page;
