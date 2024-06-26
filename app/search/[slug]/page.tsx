"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getMovieData,
  getMovieGenres,
  getMovieVideos,
  getRecomendedMovies,
} from "@/app/api/tmdb/tmdbapi";
import { Movie, MovieProp } from "@/app/types";
import MovieDetailCard from "@/components/ui/cards/MovieDetailCard";
import RecommendedMovies from "@/components/ui/cards/RecommendedMovies";
import {
  CardSkeleton,
  MovieDetailSkeletion,
  RecommendedMoviesSkeleton,
} from "@/components/ui/Skeletons";

const SearchResult = () => {
  const params = useParams();
  const inputValue = params.slug as string;

  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);
  const [videoData, setVideoData] = useState([]);
  const [currGenre, setCurrGenre] = useState([{}]);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieProp[]>([]);
  const [isLoading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      if (!inputValue) {
        setLoading(false);
        return;
      }

      const movieData = await getMovieData(inputValue);
      if (movieData.results.length > 0) {
        setSearchedMovie(movieData.results[0]);
      }

      const movieId = movieData.results[0].id;
      const videoData = await getMovieVideos(movieId);
      setVideoData(videoData.videos.results[0].key);

      const genreData = await getMovieGenres(movieId);
      setCurrGenre(genreData);

      const recommendedMovies = await getRecomendedMovies(inputValue);
      setRecommendedMovies(recommendedMovies);

      setLoading(false); // End loading after all data is fetched
    };

    fetchData();
  }, [inputValue]);

  const RenderMovies = () => {
    // Show skeleton loader if searchedMovie is null or isLoading is true
    if (!searchedMovie || isLoading) {
      return <MovieDetailSkeletion />;
    }

    return (
      <MovieDetailCard
        searchedMovie={searchedMovie}
        key={searchedMovie.id + searchedMovie.original_title}
        videoData={videoData}
        currGenre={currGenre}
      />
    );
  };

  return (
    <div className="h-screen">
      <div className="w-full">{RenderMovies()}</div>

      <h1 className="text-white text-3xl ml-5">Recommended Movies</h1>
      <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {isLoading ? (
          <RecommendedMoviesSkeleton />
        ) : (
          recommendedMovies.map((item) => (
            <RecommendedMovies key={item.id} movie={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResult;
