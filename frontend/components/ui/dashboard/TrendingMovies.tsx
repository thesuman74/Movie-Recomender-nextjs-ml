// import React, { Suspense } from "react";
// import TrendingMoviesCard from "../cards/TrendingMoviesCard";
// import { CardSkeleton } from "../Skeletons";
// import { MovieRedux } from "@/app/types";

// const data: MovieRedux[] = [
//   { id: "1", title: "Iron Man", genre: ["Action", "Adventure", "Sci-Fi"] },
//   { id: "2", title: "The Matrix", genre: ["Action", "Sci-Fi"] },
//   { id: "3", title: "Inception", genre: ["Action", "Sci-Fi"] },
//   { id: "4", title: "The Prestige", genre: ["Drama", "Mystery"] },
//   { id: "5", title: "The Wolf of Wall Street", genre: ["Biography", "Comedy"] },
// ];

// const TrendingMovies = () => {
//   return (
//     <div>
//       <div className="max-w-7xl mx-auto text-white">
//         <div className="flex ">
//           <h1 className=" max-w-7xl text-3xl font-bold my-5 ">Trending</h1>
//         </div>
//         <Suspense fallback={<CardSkeleton />}>
//           <TrendingMoviesCard data={data} />
//         </Suspense>
//       </div>
//     </div>
//   );
// };

// export default TrendingMovies;
