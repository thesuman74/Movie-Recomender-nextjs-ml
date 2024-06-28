import { auth } from "@/auth";
import PopularCategories from "@/components/ui/cards/TrendingMoviesCard";
import TrendingMovies from "@/components/ui/dashboard/TrendingMovies";
import UserHero from "@/components/ui/dashboard/UserHero";
import SideBar from "@/components/ui/SideBar";
import { redirect } from "next/navigation";
import React from "react";
import Movies from "../Home/Movies";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="">
      <UserHero />
      <TrendingMovies />
      <Movies />
    </div>
  );
};

export default page;
