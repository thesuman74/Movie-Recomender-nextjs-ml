"use client";
import MoviesCards from "@/components/ui/cards/MoviesCards";
import RecommendedMovies from "@/components/ui/cards/RecommendedMovies";
import { RecommendedMoviesSkeleton } from "@/components/ui/Skeletons";
import { getMoviesList } from "@/lib/tmdb/tmdbapi";
import React, { Suspense } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const params = {
      page: 1,
      genreId: 28, // Action movies
      sortBy: "popularity.desc",
    };

    getMoviesList(params).then((movies) => setMovies(movies));
  }, []);

  return (
    <div>
      <h1 className="text-white text-3xl ml-5"> Movies</h1>
      <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <Suspense fallback={<RecommendedMoviesSkeleton />}>
          {movies &&
            movies.map((movie) => <MoviesCards key={movie} movie={movie} />)}
        </Suspense>
      </div>
    </div>
  );
};

export default MoviesPage;
