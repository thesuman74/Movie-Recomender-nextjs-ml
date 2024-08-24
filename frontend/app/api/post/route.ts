import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();
  const { title, content } = res;
  console.log(res);
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        create: {
          name: "suman",
          password: "passsword",
        },
      },
    },
  });
  return NextResponse.json({ result });
}
