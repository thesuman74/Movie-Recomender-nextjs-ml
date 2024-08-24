import React from "react";
import Link from "next/link";

const moods = [
  { id: 1, emoji: "😃", mood: "Happy" },
  { id: 2, emoji: "🤔", mood: "confused" },
  { id: 3, emoji: "😔", mood: "Sad" },
  { id: 4, emoji: "😐", mood: "Neutral" },
  { id: 5, emoji: "🤬", mood: "Angry" },
  { id: 6, emoji: "😲", mood: "Suprised" },
  { id: 7, emoji: "😨", mood: "Fearful" },
];

const MoodCategories = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 mt-10 ">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
        {moods.map((item) => (
          <Link href={`/mood/${item.mood}`}>
            <div
              key={item.id}
              className="flex items-center justify-center text-white border border-red-500 rounded-lg p-4 cursor-pointer hover:bg-red-400"
            >
              <span className="text-md sm:text-lg md:text-xl lg:text-2xl">
                {item.emoji}
              </span>
              <p className="ml-2 text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
                {item.mood}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoodCategories;
