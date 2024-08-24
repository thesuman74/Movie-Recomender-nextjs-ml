import AddPost from "@/components/AddPost";
import DeleteButton from "@/components/ui/DeleteButton";
import prisma from "@/lib/prisma";
import React from "react";

async function getPost() {
  const posts = await prisma.post.findMany({
    // where: { published: true },
    // include: { author: { select: { name: true } } },
  });
  return posts;
}

const page = async () => {
  const data = await getPost();
  // console.log("post data", data);
  return (
    <div className="flex text-white max-w-sm space-y-2 flex-col mx-auto text-center ">
      <h1 className="text-3xl">Feeds</h1>
      {data &&
        data.map((post) => (
          <div className="border border-red-500 " key={post.id}>
            <div>{post.title}</div>
            <p>{post.content}</p>
            <DeleteButton postId={post.id} />
          </div>
        ))}

      <AddPost />
    </div>
  );
};

export default page;
