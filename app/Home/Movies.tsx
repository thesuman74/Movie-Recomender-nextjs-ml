import React from "react";
import { fetchAnime } from "../action";
import { AnimeProp } from "../types";
import MoviesCards from "@/components/ui/cards/MoviesCards";

const Movies = async () => {
  const data = await fetchAnime(1);
  return (
    <div>
      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <h2 className="text-3xl text-white font-bold">Recommended </h2>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data.map((item: AnimeProp, index: number) => (
            <MoviesCards key={item.id} anime={item} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Movies;
