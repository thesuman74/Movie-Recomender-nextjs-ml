"use client";

import MoviesCards from "@/components/ui/cards/MoviesCards";
import RecommendedMovies from "@/components/ui/cards/RecommendedMovies";
import { RecommendedMoviesSkeleton } from "@/components/ui/Skeletons";
import { getAllMoviesBylimit, getMoviesList } from "@/lib/tmdb/tmdbapi";
import React from "react";
import { MovieProp } from "../types";
import { useQuery } from "@tanstack/react-query";

const AllMoviesList = () => {
  const inputValue = "16";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Allmovielist", inputValue],
    queryFn: () => getAllMoviesBylimit(inputValue),
    enabled: !!inputValue,
  });

  if (isLoading) {
    return (
      <div>
        <h1 className="text-white text-3xl ml-5"> Movies</h1>
        <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <RecommendedMoviesSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-white text-3xl ml-5">Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white text-3xl ml-5"> Movies</h1>
      <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {data &&
          data.map((movie, index) => <MoviesCards key={index} movie={movie} />)}
      </div>
    </div>
  );
};

export default AllMoviesList;
