export default async function fetchMoviesByGenre({
  apiKey,
}: {
  apiKey: string | undefined;
}) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}
