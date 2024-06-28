import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  movies: string[];
  placeholder: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ movies, placeholder }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotFound(false);
    const wordEntered = event.target.value.trim();
    setInputValue(wordEntered);
    const newFilter = movies.filter((value) => {
      return value.toLowerCase().includes(wordEntered.toLowerCase());
    });
    if (newFilter.length > 0) {
      setFilteredMovies(newFilter);
    } else {
      setFilteredMovies([]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent the form from causing a page reload
    let flag = filteredMovies.some(
      (movie) => inputValue.toLowerCase() === movie.toLowerCase()
    );
    if (flag) {
      router.push(`/search/${inputValue}`);
    } else {
      setNotFound(true);
    }
  };

  return (
    <>
      <div className="mt-10 w-full max-w-md mx-auto lg:mx-0">
        <form
          className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
                    border border-gray-200 bg-gray-100 rounded-full ease-linear focus-within:bg-white focus-within:border-blue-600"
          onSubmit={handleSubmit}
        >
          <span className="min-w-max pr-2 border-r border-gray-200"></span>
          <input
            type="text"
            title="Search"
            placeholder={placeholder}
            className="w-full py-3 outline-none bg-transparent relative"
            onChange={handleChange}
          />
          <button type="submit" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
        </form>
        {filteredMovies.length > 0 && (
          <div className=" mt-2 z-10 absolute bg-black bg-opacity-80 text-white  ">
            {filteredMovies.slice(0, 8).map((movie, index) => (
              <div
                key={index}
                className=" p-2 cursor-pointer hover:bg-gray-100  hover:bg-opacity-40 rounded-xl "
                onClick={() => router.push(`/search/${movie}`)}
              >
                {movie}
              </div>
            ))}
          </div>
        )}
        {notFound && (
          <div className="NotFound mt-2 p-2 text-red-500">
            Sorry! The movie you searched for is not present in our database.
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
