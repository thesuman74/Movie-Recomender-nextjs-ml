import { AnimeProp } from "@/app/types";
import React from "react";

interface Prop {
  anime: AnimeProp;
  index: number;
}

function MoviesCards({ anime }: Prop) {
  // const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        <div className=" relative max-w-64 min-w-64 bg-transparent shadow-xl rounded-lg h-auto m-4 flex flex-col items-center  ">
          <div className="flex  rounded-md bg-black bg-opacity-80 left-7 top-5  px-2 py-1 text-orange-300 absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <p className="px-2">{anime.score}</p>
          </div>
          <div>
            <img
              src={`https://shikimori.one${anime.image.original}`}
              alt=""
              className="w-[280px] h-[400px]   rounded-lg object-cover "
            />
          </div>
          <div>
            <p className="p-3 text-xl  text-white dark:text-white">
              {anime.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesCards;
