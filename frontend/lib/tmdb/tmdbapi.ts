// api/tmdbapi.ts
import { moviesList } from "@/app/action";
import { MovieProp } from "@/app/types";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getMovieData = async (inputValue: string) => {
  const movieDataUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    inputValue
  )}`;
  const response = await axios.get(movieDataUrl);
  return response.data;
};

export const getMovieGenres = async (movieId: number) => {
  const genreDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await axios.get(genreDataUrl);
  return response.data.genres;
};

export const getMovieVideos = async (movieId: number) => {
  const videoDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
  const response = await axios.get(videoDataUrl);
  console.log(
    "This is gotMovievideos key",
    response.data.videos.results[0].key
  );

  return response.data.videos.results[0].key;
};

export const getMovieDetail = async (movieId: number) => {
  const videoDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
  const response = await axios.get(videoDataUrl);
  console.log("gotvideo and genre api resonse", response);

  const movieGenre = response.data.genres;
  const videoKey = response.data.videos.results[0].key;
  return { movieGenre, videoKey };
};

// getting data from flask server
export const getRecomendedMovies = async (inputValue: string) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/api/similarity/${inputValue}`
  );
  const recommendedMovies = response.data.movies;
  const movieDetails = [];

  for (let i = 0; i < 10; i++) {
    const movie = recommendedMovies[i];
    const movieData = await getMovieData(movie);

    movieDetails.push(movieData.results[0]);
  }
  // console.log("this is recommended movie details", recommendedMovies);

  return movieDetails;
};

export const getMoviesByGenre = async (inputValue: string) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/api/genre/${inputValue}`
  );
  console.log("this is movies by genre", response);

  const recommendedMovies = response.data.movies;
  const movieDetails = [];

  for (let i = 0; i < 10; i++) {
    const movie = recommendedMovies[i];
    const movieData = await getMovieData(movie);

    movieDetails.push(movieData.results[0]);
  }
  // console.log("this is recommended movie details", recommendedMovies);

  return movieDetails;
};

export const getMoviesByMood = async (inputValue: string) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/api/mood/${inputValue}`
  );
  console.log("this is movies by genre", response);

  const recommendedMovies = response.data.movies;
  const movieDetails = [];

  for (let i = 0; i < 10; i++) {
    const movie = recommendedMovies[i];
    const movieData = await getMovieData(movie);

    movieDetails.push(movieData.results[0]);
  }
  // console.log("this is recommended movie details", recommendedMovies);

  return movieDetails;
};

export const getMoviesList = async (params: {
  page: number;
  genreId?: number;
  sortBy?: string;
}) => {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${params.page}`;

  if (params.genreId) {
    url += `&with_genres=${params.genreId}`;
  }

  if (params.sortBy) {
    url += `&sort_by=${params.sortBy}`;
  }

  const response = await axios.get(url);
  const movies: MovieProp[] = response.data.results;

  const moviesWithGenres: MovieProp[] = await Promise.all(
    movies.map(async (movie) => {
      const genres: { name: string }[] = await getMovieGenres(
        parseInt(movie.id)
      );
      const genreNames: string[] = genres.map((genre) => genre.name);
      return { ...movie, genre: genreNames };
    })
  );

  return moviesWithGenres;
};

export const getMovieDataFormatted = async (
  movieName: string
): Promise<MovieProp> => {
  const movieData = await getMovieData(movieName);
  const movieId = movieData.results[0].id;
  const genres: { name: string }[] = await getMovieGenres(movieId);
  const genreNames: string[] = genres.map((genre) => genre.name);

  const movieDetail = await getMovieDetail(movieId);

  const formattedMovieData: MovieProp = {
    id: movieId.toString(),
    backdrop_path: movieData.results[0].backdrop_path,
    genre_ids: movieData.results[0].genre_ids,
    original_title: movieData.results[0].original_title,
    overview: movieData.results[0].overview,
    poster_path: movieData.results[0].poster_path,
    release_date: movieData.results[0].release_date,
    title: movieData.results[0].title,
    vote_average: movieData.results[0].vote_average,
    genre: genreNames,
  };

  return formattedMovieData;
};
