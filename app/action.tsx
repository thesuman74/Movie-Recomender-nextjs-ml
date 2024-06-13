"use server";

import { signIn, signOut } from "@/auth";

const MAX_LIMIT = 40;
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
    await signIn(action, { redirectTo: "/dashboard" });
    console.log(action);
  } else {
    console.error("Action is not a valid string");
  }
}

export async function doCredentialLogin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("this is Docredentiallogin ", email, password);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("this is Docredentiallogin response ", email, password);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}
