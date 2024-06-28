import Link from "next/link";
import { DialogCard } from "./DialogCard";

// Define an interface for the movie prop
interface Movie {
  title: string;
  poster_path: string | null;
  vote_average: number | null;
  backdrop_path: string | null;
  overview: string | null;
  release_date: string;
}

interface MovieCardProps {
  searchedMovie: Movie;
  videoData: any;
  currGenre: any;
}

const img_path = "https://image.tmdb.org/t/p/w342";
const backdropPath = "https://image.tmdb.org/t/p/w1280";

const MovieDetailCard: React.FC<MovieCardProps> = ({
  searchedMovie,
  videoData,
  currGenre,
}) => {
  console.log("currGenre:", currGenre);
  return (
    <div
      className="grid h-[600px] w-full grid-cols-2 items-center justify-center  gap-5 px-10 "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        
        
        url(${backdropPath}${searchedMovie.backdrop_path})`,
      }}
    >
      <div className=" space-y-4  ml-20">
        <h2 className="text-5xl text-white font-bold">{searchedMovie.title}</h2>
        <p className="text-white ">{searchedMovie.overview}</p>

        <div className="space-y-1">
          <p className="font-xl font-bold text-white">
            Ratings: <span className="text-orange-400">★★★★☆</span>{" "}
            {searchedMovie.vote_average}
          </p>
          <p className="font-xl font-bold text-white">
            Release Date:{" "}
            <span className="font-normal">{searchedMovie.release_date} </span>
          </p>
          <p className="font-xl flex flex-wrap font-bold text-white space-x-2 cursor-pointer">
            Genre:{"  "}
            {currGenre.map((genre: { id: string; name: string }) => (
              <Link href={`../genre/${genre.name}`}>
                <span
                  key={genre.id}
                  className="py-1  px-3 mx-1 text-sm border border-red-400 rounded-2xl"
                >
                  {genre.name}
                </span>
              </Link>
            ))}
          </p>
        </div>

        <DialogCard videoData={videoData} />
      </div>

      {/* image section  */}
      <div className=" flex justify-center  mr-20 ">
        <img
          src={img_path + searchedMovie.poster_path}
          alt=""
          className="rounded-lg w-[280px] h-[420px] object-cover"
        />
      </div>
    </div>
  );
};
export default MovieDetailCard;
