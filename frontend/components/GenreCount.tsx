"use client";
import { selectGenreCounts } from "@/lib/store/features/cart/FavouriteSelector";
import React from "react";
import { useSelector } from "react-redux";

interface GenreCountsProps {
  genreCounts: { [genre: string]: number };
}

const GenreCountsContainer: React.FC<GenreCountsProps> = ({ genreCounts }) => {
  return (
    <div>
      {Object.keys(genreCounts).map((genre, index) => (
        <div key={index}>
          <span>{genre}</span>: {genreCounts[genre]}
        </div>
      ))}
    </div>
  );
};

const GenreCounts = () => {
  const genreCounts = useSelector(selectGenreCounts);

  return <GenreCountsContainer genreCounts={genreCounts} />;
};

export default GenreCounts;
