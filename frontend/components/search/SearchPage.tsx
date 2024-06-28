import Movies from "@/app/Home/Movies";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <section className="container m-5 mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <div className="w-full ">
          <img
            src="poster.jpg"
            alt=""
            className="mx-auto h-[600px] w-[600px] rounded-xl object-cover object-top"
          />
        </div>
        <div className="w-full flex items-center  ">
          <div className="flex flex-col justify-center pl-10 lg:pl-20 dark:text-dark text-white z-10  space-y-4">
            <span className="bg-red-600 text-xs uppercase px-2 py-1 rounded w-10">
              HD
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold ">The Fall Guy</h1>
            <p className="text-lg">
              A down-and-out stuntman must find the missing star of his
              ex-girlfriend's blockbuster film.
            </p>
            <div className="flex space-x-4">
              <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
                PG-13
              </span>
              <span className="py-1 px-3 text-sm ">★★★★☆ 7/10</span>

              <span className="py-1 px-3 text-sm border border-red-400 rounded-2xl">
                Drama
              </span>
              <span className="py-1 px-3 text-sm border border-red-400 rounded-2xl">
                Comedy
              </span>
              <span className="py-1 px-3 text-sm border border-red-400 rounded-2xl">
                Action
              </span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-28">
              Play
            </button>
          </div>
        </div>
      </section>
      <Movies />
    </div>
  );
};

export default SearchPage;
