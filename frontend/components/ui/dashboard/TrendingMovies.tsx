import React, { Suspense } from "react";
import TrendingMoviesCard from "../cards/TrendingMoviesCard";
import { CardSkeleton } from "../Skeletons";

const TrendingMovies = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto text-white">
        <div className="flex ">
          <h1 className=" max-w-7xl text-3xl font-bold my-5 ">Trending</h1>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <TrendingMoviesCard />
        </Suspense>
      </div>
    </div>
  );
};

export default TrendingMovies;
