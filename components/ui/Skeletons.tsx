import React from "react";

export function CardSkeleton() {
  const skeletonItems = Array(5).fill(null);

  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
