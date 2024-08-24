"use client";
import { useParams } from "next/navigation";
import {
  getCollaborativeRecommendedMovies,
  getMovieData,
  getMovieDetail,
  getRecomendedMovies,
} from "@/lib/tmdb/tmdbapi";
import { useQuery } from "@tanstack/react-query";
import MovieDetailCard from "@/components/ui/cards/MovieDetailCard";
import RecommendedMovies from "@/components/ui/cards/RecommendedMovies";
import {
  MovieDetailSkeleton,
  RecommendedMoviesSkeleton,
} from "@/components/ui/Skeletons";
import MoviesCards from "@/components/ui/cards/MoviesCards";

const SearchResult = () => {
  const { slug } = useParams();
  const inputValue = Array.isArray(slug) ? slug[0] : slug;

  const movieDataQuery = useQuery({
    queryKey: ["movieData", inputValue],
    queryFn: () => getMovieData(inputValue),
    enabled: !!inputValue,
  });

  const movieId = movieDataQuery.data?.results[0]?.id;

  const movieDetailQuery = useQuery({
    queryKey: ["GenreAndVideoDetail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: !!movieId,
  });

  console.log("this is genreand videoDetail", movieDetailQuery);

  const recommendedMoviesQuery = useQuery({
    queryKey: ["RecommendedMoviesList", inputValue],
    queryFn: () => getRecomendedMovies(inputValue),
    enabled: !!inputValue,
  });

  const Collaborativerecommendation = useQuery({
    queryKey: ["CollaborativeRecommendedMoviesList", inputValue],
    queryFn: () => getCollaborativeRecommendedMovies(inputValue),
    enabled: !!inputValue,
  });

  if (Collaborativerecommendation.data) {
    console.log(
      "Collaborative Recommendation:",
      Collaborativerecommendation.data
    );
  }

  if (movieDataQuery.isLoading || movieDetailQuery.isLoading) {
    return (
      <div>
        <MovieDetailSkeleton />
      </div>
    );
  }

  if (movieDataQuery.isError || movieDetailQuery.isError) {
    return <div>Error loading Movie details </div>;
  }

  if (recommendedMoviesQuery.isError || Collaborativerecommendation.isError) {
    return <div>Error loading Recommended Data</div>;
  }

  if (!movieDataQuery.data || !movieDataQuery.data.results.length) {
    return <div>No movie data found.</div>;
  }

  const { movieGenre, videoKey } = movieDetailQuery.data ?? {};

  return (
    <div className="h-screen">
      <MovieDetailCard
        searchedMovie={movieDataQuery.data.results[0]}
        currGenre={movieGenre || []}
        videoData={videoKey || []}
      />
      <h1 className="text-white text-3xl ml-5">Recommended Movies</h1>
      {/* basaed on content  */}
      <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {recommendedMoviesQuery.isLoading ? (
          <RecommendedMoviesSkeleton />
        ) : recommendedMoviesQuery.data !== null &&
          recommendedMoviesQuery.data !== undefined ? (
          recommendedMoviesQuery.data.length > 0 ? (
            recommendedMoviesQuery.data.map((item) => (
              <MoviesCards key={item.id} movie={item} />
            ))
          ) : (
            <p>No current recommendations for this movie</p>
          )
        ) : (
          <p>No data available</p>
        )}
      </div>
      {/* collaborative recommendation  */}
      <h1 className="text-white text-xl ml-5">Collaborative Recommendation</h1>
      <div className="container grid gap-5 p-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {Collaborativerecommendation.isLoading ? (
          <RecommendedMoviesSkeleton />
        ) : Collaborativerecommendation.data !== null &&
          Collaborativerecommendation.data !== undefined ? (
          Collaborativerecommendation.data.length > 0 ? (
            Collaborativerecommendation.data.map((collab, index) => (
              <MoviesCards key={index} movie={collab} />
            ))
          ) : (
            <p>No current recommendations for this movie</p>
          )
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
