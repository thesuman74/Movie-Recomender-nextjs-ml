"use server";

import { signIn, signOut } from "@/auth";

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

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");

  if (typeof action === "string") {
    await signIn(action, { redirectTo: "/profile" });
    console.log(action);
  } else {
    console.error("Action is not a valid string");
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/test" });
}
