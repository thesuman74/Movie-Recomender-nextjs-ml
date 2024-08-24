import { AnimeProp, Movie, MovieProp, MovieRedux } from "@/app/types";
import { addMovietoFavourite } from "@/lib/store/features/cart/FavouriteSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "../use-toast";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";

const MoviesCards = ({ movie }: { movie: MovieProp }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  console.log("Movie details from movie card", movie);

  const handleAddToFavorites = () => {
    const movieToAdd: MovieRedux = {
      id: movie.id,
      title: movie.title,
      original_title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      overview: "",
      release_date: "",
      genre_ids: movie.genre_ids || [],
      genre: movie.genre,
    };
    dispatch(addMovietoFavourite(movieToAdd));

    toast({
      variant: "success",
      title: "Added to Favourite",
    });
  };

  return (
    <div className="relative m-5">
      {/* Favorite button */}
      <button
        className="absolute top-2 right-5 w-7 h-7 flex items-center justify-center rounded-full hover:scale-110 transition-all duration-150 z-10 cursor-pointer hover:fill group-hover:scale-105"
        onClick={handleAddToFavorites}
      >
        <Heart color="#ff0000" />
      </button>
      <Link href={`/search/${movie.title}`} className="cursor-pointer">
        <div className="flex rounded-md bg-black bg-opacity-80 left-7 top-5  px-2 py-1 text-orange-300 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 "
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <p className="px-2 text-white">{movie.vote_average}</p>
        </div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt=""
            className="w-[280px] h-[400px]   rounded-lg object-cover "
          />
        </div>
        <div>
          <p className="p-3 text-xl  text-white dark:text-white">
            {movie.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MoviesCards;
