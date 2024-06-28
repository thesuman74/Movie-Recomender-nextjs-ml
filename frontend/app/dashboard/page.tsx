import { auth } from "@/auth";
import TrendingMovies from "@/components/ui/dashboard/TrendingMovies";

import { redirect } from "next/navigation";
import React from "react";
import Movies from "../Home/Movies";
import UserProfile from "@/components/UserProfile";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="">
      {/* <UserHero /> */}
      <UserProfile />

      <TrendingMovies />
      <Movies />
    </div>
  );
};

export default page;
