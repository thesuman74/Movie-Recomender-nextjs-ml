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
