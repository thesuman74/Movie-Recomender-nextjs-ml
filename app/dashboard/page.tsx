import { auth } from "@/auth";
import PopularCategories from "@/components/ui/cards/TrendingMoviesCard";
import TrendingMovies from "@/components/ui/dashboard/TrendingMovies";
import UserHero from "@/components/ui/dashboard/UserHero";
import SideBar from "@/components/ui/SideBar";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div>
      <UserHero />
      <TrendingMovies />
    </div>
  );
};

export default page;
