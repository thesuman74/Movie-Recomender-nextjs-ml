import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "@/components/LogoutButton";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/test");

  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image || "/default-image.png"; // Provide a default image path

  return (
    <div className="flex flex-col items-center m-4 h-screen space-y-5">
      <h1 className="text-3xl my-2">This is user profile page</h1>
      <Image
        src={userImage}
        alt={userName}
        width={100}
        height={100}
        quality={100}
        className="rounded-full"
        priority // This attribute helps load the image faster, especially if it's above the fold
      />
      <h2 className="">{userName}</h2>
      <Logout />
    </div>
  );
};

export default page;
