"use client";
import { addMovietoFavourite } from "@/lib/store/features/cart/FavouriteSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const TrendingMoviesCard = () => {
  const dispatch = useDispatch();
  const data = Array.from({ length: 5 }); // Creates an array with 5 elements.

  const handleAddToFavorites = (movieTitle: string) => {
    dispatch(
      addMovietoFavourite({
        title: movieTitle,
        genre: [],
        id: "",
      })
    );
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 container max-w-7xl mx-auto p-4">
      {data.map((_, index) => (
        <div
          key={index} // Use index as the key for each element
          className="relative max-w-xs mt-3 rounded-lg shadow-md mx-auto group"
        >
          {/* Favorite button */}
          <button
            className="absolute top-2 right-5 w-7 h-7 flex items-center justify-center rounded-full hover:scale-110 transition-all duration-150 z-10 cursor-pointer hover:fill group-hover:scale-105"
            onClick={() => handleAddToFavorites("Iron Man")} // Add the movie title to the favorites list
          >
            <Heart color="#ff0000" />
          </button>

          <img
            src="/poster.jpg"
            alt="Movie poster"
            className="w-full rounded-lg rounded-b-none transition-transform duration-200 group-hover:scale-105"
          />

          <div className=" p-2 rounded-lg rounded-t-none ">
            <p className="ml-5 font-medium text-wrap text-sm">Iron Man</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingMoviesCard;
