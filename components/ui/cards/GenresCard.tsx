import React from "react";
import Link from "next/link";

const genres = [
  { id: 1, icon: "🎥", genre: "ACTION" },
  { id: 2, icon: "👻", genre: "HORROR" },
  { id: 3, icon: "😂", genre: "COMEDY" },
  { id: 4, icon: "💔", genre: "ROMANCE" },
  { id: 5, icon: "🤖", genre: "SCI-FI" },
  { id: 6, icon: "🎬", genre: "DRAMA" },
  { id: 7, icon: "🕵️‍♂️", genre: "MYSTERY" },
  { id: 8, icon: "🏰", genre: "FANTASY" },
  { id: 9, icon: "🎤", genre: "MUSICAL" },
  { id: 10, icon: "🏆", genre: "SPORTS" },
  { id: 11, icon: "📚", genre: "DOCUMENTARY" },
  { id: 12, icon: "👑", genre: "HISTORY" },
  { id: 13, icon: "🚀", genre: "ADVENTURE" },
  { id: 14, icon: "💼", genre: "THRILLER" },
  { id: 15, icon: "🎭", genre: "CRIME" },
];

const GenreCategories = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 mt-10 ">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
        {genres.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center border border-red-500 rounded-lg p-4 cursor-pointer hover:bg-red-400"
          >
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl">
              {item.icon}
            </span>
            <p className="ml-2 text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
              {item.genre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreCategories;
