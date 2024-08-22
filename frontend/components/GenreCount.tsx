"use client";
// components/GenreCount.js
import { useSelector } from "react-redux";
import { getTopGenres } from "@/lib/store/features/cart/FavouriteSlice";
import { RootState } from "@/lib/store/Store";

const GenreCount = () => {
  const favouriteState = useSelector((state: RootState) => state.favourite);
  const topGenres = getTopGenres(favouriteState);

  return (
    <div className="flex mt-2 justify-between mx-20">
      {topGenres.map((genre, index) => (
        <div
          key={index}
          className="relative w-24 h-24 rounded-full mx-3 border border-opacity-40"
        >
          {/* your SVG and text elements here */}

          <svg viewBox="0 0 36 36" className="w-24 h-24">
            <path
              className="text-gray-300"
              strokeWidth="3.8"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
            />
            <path
              className={`stroke-current text-${genre.genre.toLowerCase()}`}
              strokeWidth="3.8"
              stroke-dasharray={`${genre.percentage}, 100`}
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
            />
          </svg>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-${genre.genre.toLowerCase()}`}
          >
            {genre.percentage}%
            <span className="text-xs block">{genre.genre}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreCount;
