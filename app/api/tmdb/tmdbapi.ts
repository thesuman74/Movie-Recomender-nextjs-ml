// api/tmdbapi.ts
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getMovieData = async (inputValue: string) => {
  const movieDataUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    inputValue
  )}`;
  const response = await axios.get(movieDataUrl);
  return response.data;
};

export const getMovieVideos = async (movieId: number) => {
  const videoDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
  const response = await axios.get(videoDataUrl);
  // console.log("This is gotMovievideos", response);
  return response.data;
};

export const getMovieGenres = async (movieId: number) => {
  const videoDataUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await axios.get(videoDataUrl);
  return response.data.genres;
};

// getting data from flask server
export const getRecomendedMovies = async (inputValue: string) => {
  const recommendedMoviesUrl = `http://127.0.0.1:5000/api/similarity/${inputValue}`;
  const response = await axios.get(recommendedMoviesUrl);
  const recommendedMovies = response.data.movies;
  const movieDetails = [];

  for (let i = 0; i < recommendedMovies.length; i++) {
    const movie = recommendedMovies[i];
    const movieData = await getMovieData(movie);
    movieDetails.push(movieData.results[0]);
  }
  // console.log("this is movie details", movieDetails);

  return movieDetails;
};