"use client";
import { useEffect, useState } from "react";
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

const SearchResult = () => {
  const params = useParams();
  const inputValue = params.slug as string;

  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);
  const [videoData, setVideoData] = useState([]);
  const [currGenre, setCurrGenre] = useState([{}]);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      const movieData = await getMovieData(inputValue);
      if (movieData.results.length > 0) {
        setSearchedMovie(movieData.results[0]);
      }

      // getting movie detail

      const movieId = movieData.results[0].id;
      const videoData = await getMovieVideos(movieId);
      setVideoData(videoData.videos.results[0].key);

      // getting movie genres
      const genreData = await getMovieGenres(movieId);
      setCurrGenre(genreData);
      console.log("Genre data", genreData);

      //getting movie recommendation

      const recommendedMovies = await getRecomendedMovies(inputValue);
      setRecommendedMovies(recommendedMovies);

      console.log("Recommended Movies", recommendedMovies);
    };

    fetchData();
  }, [inputValue]);

  const RenderMovies = () => {
    if (searchedMovie) {
      return (
        <MovieDetailCard
          searchedMovie={searchedMovie}
          key={searchedMovie.id + searchedMovie.original_title}
          videoData={videoData}
          currGenre={currGenre}
        />
      );
    }
    return null;
  };

  return (
    <div className="h-screen">
      <div className="w-full">{RenderMovies()}</div>

      <div className="">
        <h1 className="text-white text-3xl ml-5">Recommended Movies</h1>
        <div className=" container  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
          {recommendedMovies.map((item) => (
            <RecommendedMovies key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
