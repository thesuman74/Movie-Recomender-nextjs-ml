import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
});

export const getMovieData = async (inputValue: string) => {
  try {
    const response = await axiosInstance.get("/search/movie", {
      params: {
        query: encodeURIComponent(inputValue),
      },
    });
    console.log("GetMovieData is called", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};
// getMovieData contains backdrop, poster, genre, overview, release_date, vote_avarage

export const getMovieVideos = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    console.log("GetMovieVideos is called");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

export const FilterByGenres = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    console.log("GetMovieGenres is called");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};

export const getRecomendedMovies = async (inputValue: string) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/similarity/${inputValue}`
    );
    const recommendedMovies = response.data.movies;

    const movieDataPromises = recommendedMovies
      .slice(0, 10)
      .map((movie: string) =>
        getMovieData(movie).then((res) => res.results[0])
      );
    const movieDetails = await Promise.all(movieDataPromises);
    console.log("GetRecomendedMovies is called");
    return movieDetails;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};

export const getMovieList = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/movies");
    console.log("GetMovieList is called");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genre: string, limit = 10) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/genre/${genre}`,
      {
        params: { limit },
      }
    );
    const recommendedMovies = response.data.movies;
    const genreDataPromises = recommendedMovies.map((movie: string) =>
      getMovieData(movie).then((res) => res.results[0])
    );
    const genreMoviesDetail = await Promise.all(genreDataPromises);
    return genreMoviesDetail;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};
