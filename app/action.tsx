const MAX_LIMIT = 8;

export async function fetchAnime(page = 1) {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`,
    { next: { revalidate: 10 } }
  );
  const data = await response.json();
  console.log("fetched data", data);
  return data;
}
