"use client";
import { RecommendedMoviesSkeleton } from "@/components/ui/Skeletons";
import React, { useState, useEffect, Suspense } from "react";
import FavouriteMoviesCard from "@/components/cards/FavouriteMoviesCard";

const FavouriteMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem("favoriteMovies");
    console.log("local storage data ", storedMovies);
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, [localStorage]);

  return (
    <div>
      <h1 className="text-white text-3xl ml-5 px-1 mt-5">Favourite Movies</h1>
      <div className="container grid gap-5 p-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <Suspense fallback={<RecommendedMoviesSkeleton />}>
          {movies &&
            movies.map((movie) => <FavouriteMoviesCard movie={movie} />)}
        </Suspense>
      </div>
    </div>
  );
};

export default FavouriteMovies;
