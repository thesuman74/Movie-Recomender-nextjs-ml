// pages/index.js or a specific component file
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full h-96 -my-5  relative">
      {/* Content Section */}
      <div className="flex flex-col justify-center pl-10 lg:pl-20 text-white z-10 w-1/2 space-y-4">
        <span className="bg-red-600 text-xs uppercase px-2 py-1 rounded w-10">
          HD
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold">The Fall Guy</h1>
        <p className="text-lg">
          A down-and-out stuntman must find the missing star of his
          ex-girlfriend's blockbuster film.
        </p>
        <div className="flex space-x-4">
          <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
            PG-13
          </span>
          <span className="py-1 px-3 text-sm">★★★★☆ 7/10</span>
          <span className="py-1 px-3 text-sm">Drama</span>
          <span className="py-1 px-3 text-sm">Comedy</span>
          <span className="py-1 px-3 text-sm">Action</span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-28">
          Play
        </button>
      </div>
      {/* Image Section */}
      <div className="flex-1 flex justify-end items-center pr-10">
        <img
          src="https://picsum.photos/500"
          alt="The Fall Guy"
          className="object-cover rounded-lg shadow-lg w-full h-80"
        />
      </div>
    </div>
  );
}
