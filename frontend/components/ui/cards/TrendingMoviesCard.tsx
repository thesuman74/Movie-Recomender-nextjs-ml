// Import necessary React and Next.js components
import { Heart } from "lucide-react";
import Image from "next/image"; // Correct import for the Next.js Image component
import React from "react";

const TrendingMoviesCard = () => {
  const data = Array.from({ length: 5 }); // Creates an array with 5 elements.

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 container max-w-7xl mx-auto p-4">
      {data.map((_, index) => (
        <div
          key={index} // Use index as the key for each element
          className="relative max-w-xs mt-3 rounded-lg shadow-md mx-auto group"
        >
          {/* Favorite button */}
          <button className="absolute top-2 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-white z-10 cursor-pointer hover:fill group-hover:scale-105">
            <Heart color="#ff0000" />
          </button>

          <img
            src="/poster.jpg"
            alt="Movie poster"
            className="w-full rounded-lg rounded-b-none transition-transform duration-200 group-hover:scale-105"
          />

          <div className="bg-gray-100 p-2 rounded-lg rounded-t-none text-black">
            <p className="ml-5 font-medium text-wrap text-sm">Iron Man</p>
            <p className="text-sm ml-5">Description</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingMoviesCard;
