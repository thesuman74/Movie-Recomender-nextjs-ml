"use client";
import { addMovietoFavourite } from "@/lib/store/features/cart/FavouriteSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../use-toast";
import { Movie, MovieRedux } from "@/app/types";

const data: MovieRedux[] = [
  { id: "1", title: "Iron Man", genre: ["Action", "Adventure", "Sci-Fi"] },
  { id: "2", title: "The Matrix", genre: ["Action", "Sci-Fi"] },
  { id: "3", title: "Inception", genre: ["Action", "Sci-Fi"] },
  { id: "4", title: "The Prestige", genre: ["Drama", "Mystery"] },
  { id: "5", title: "The Wolf of Wall Street", genre: ["Biography", "Comedy"] },
];

const TrendingMoviesCard = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToFavorites = (movie: MovieRedux) => {
    const movieToAdd: Movie = {
      ...movie,
      // Add any additional properties required by the Movie type
      original_title: movie.title,
      backdrop_path: "",
      poster_path: "",
      vote_average: 0,
      overview: "",
      release_date: "",
      genre_ids: [],
    };
    dispatch(addMovietoFavourite(movieToAdd));
    toast({
      variant: "success",
      title: "Added to Favourite",
    });
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 container max-w-7xl mx-auto p-4">
      {data.map((movie) => (
        <div
          key={movie.id}
          className="relative max-w-xs mt-3 rounded-lg shadow-md mx-auto group"
        >
          {/* Favorite button */}
          <button
            className="absolute top-2 right-5 w-7 h-7 flex items-center justify-center rounded-full hover:scale-110 transition-all duration-150 z-10 cursor-pointer hover:fill group-hover:scale-105"
            onClick={() => handleAddToFavorites(movie)}
          >
            <Heart color="#ff0000" />
          </button>

          <img
            src="/poster.jpg"
            alt="Movie poster"
            className="w-full rounded-lg rounded-b-none transition-transform duration-200 group-hover:scale-105"
          />

          <div className="p-2 rounded-lg rounded-t-none">
            <p className="ml-5 font-medium text-wrap text-sm">{movie.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingMoviesCard;
