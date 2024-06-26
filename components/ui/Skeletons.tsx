import React from "react";

export function CardSkeleton() {
  const skeletonItems = Array(5).fill(null);

  return (
    <div className="mx-auto grid  grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {skeletonItems.map((_, index) => (
        <div key={index} className="m-3 w-full">
          <div className="max-w-xs animate-pulse overflow-hidden rounded shadow-lg">
            <div className="h-48 bg-gray-200"></div>
            <div className="px-6 py-4">
              <div className="mb-2 h-6 bg-gray-200"></div>
              <div className="h-4 w-2/3 bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MovieDetailSkeletion() {
  return (
    <div
      className="grid h-[600px] w-full grid-cols-2 items-center justify-center gap-5 px-10"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
   `,
      }}
    >
      {/* <!-- Text Section Skeleton --> */}
      <div className="space-y-4 ml-20">
        <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>

        <div className="space-y-1">
          <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>

        {/* <!-- Placeholder for any dialog or additional components --> */}
        <div className="h-10 w-1/4 bg-gray-200 rounded"></div>
      </div>

      {/* <!-- Image Section Skeleton --> */}
      <div className="flex justify-center mr-20">
        <div className="h-[420px] w-[280px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}

export function RecommendedMoviesSkeleton() {
  // Create an array with 4 elements to generate 4 skeleton cards
  const skeletonItems = Array(4).fill(null);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="mx-auto grid gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {/* <div key={index} className="m-3 w-full"> */}
          <div className="m-3 w-full">
            <div className="relative m-5">
              {/* Simulated badge/label */}
              <div className="absolute left-7 top-5 flex animate-pulse rounded-md bg-slate-400 bg-opacity-80 px-10 py-4"></div>
              {/* Simulated movie poster */}
              <div className="h-[400px] w-[280px] animate-pulse rounded-lg bg-slate-200"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
