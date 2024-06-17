"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieCard from "@/components/ui/cards/MovieCard";

type Movie = {
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
};

const SearchResult = () => {
  const params = useParams();
  const apiKey = "api_key=b97316ed479ee4226afefc88d1792909";
  const imgLink = "https://image.tmdb.org/t/p/original";
  const backdropPath = "https://image.tmdb.org/t/p/w1280";
  const inputValue = params.slug as string;

  const [searchedMovie, setSearchedMovie] = useState<Movie | null>(null);

  const fetchAPI = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      const movieDataUrl = `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${encodeURIComponent(
        inputValue
      )}`;
      const movieData = await fetchAPI(movieDataUrl);
      if (movieData.results.length > 0) {
        setSearchedMovie(movieData.results[0]);
        console.log("Fetched movie data:", movieData.results[0]);
      }
    };

    fetchData();
  }, [inputValue, apiKey]);

  const RenderMovies = () => {
    if (searchedMovie) {
      return (
        <MovieCard
          searchedMovie={searchedMovie}
          key={searchedMovie.id + searchedMovie.original_title}
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
