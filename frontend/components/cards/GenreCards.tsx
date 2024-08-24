import { GenreTypes } from "@/app/types";
import Link from "next/link";
import React from "react";

const GenreCards = ({ homeGenreList }: { homeGenreList: GenreTypes[] }) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 mt-10">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
          {homeGenreList.map((genre) => (
            <Link href={`/genre/${genre.name}`}>
              <div
                key={genre.id}
                className="flex items-center text-white justify-center border border-red-500 rounded-lg p-4 cursor-pointer hover:bg-red-400"
              >
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {genre.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreCards;
