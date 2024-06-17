"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieCard from "@/components/ui/cards/MovieCard";
import {
  getMovieData,
  getMovieGenres,
  getMovieVideos,
} from "@/app/api/tmdb/tmdbapi";
import { Movie } from "@/app/types";
import ReactPlayer from "react-player";

const SearchResult = () => {
  const params = useParams();
  const inputValue = params.slug as string;

  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);
  const [videoData, setVideoData] = useState([]);
  const [currGenre, setCurrGenre] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      const movieData = await getMovieData(inputValue);
      if (movieData.results.length > 0) {
        setSearchedMovie(movieData.results[0]);
      }

      const movieId = movieData.results[0].id;
      const videoData = await getMovieVideos(movieId);
      setVideoData(videoData.videos.results[0].key);

      const genreData = await getMovieGenres(movieId);
      setCurrGenre(genreData);
      console.log("Genre data", genreData);
    };

    fetchData();
  }, [inputValue]);

  const RenderMovies = () => {
    if (searchedMovie) {
      return (
        <MovieCard
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
    </div>
  );
};

export default SearchResult;
