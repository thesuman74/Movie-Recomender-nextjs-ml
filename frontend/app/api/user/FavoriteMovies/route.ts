import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { title, genre } = req.body;
    const userId = session?.user?.id;

    const favoriteMovie = await prisma.favoriteMovie.create({
      data: {
        title,
        genres: { set: genre as string[] },
        user: { connect: { id: parseInt(userId as string, 10) } }, // cast to number
      },
    });
    return res.json(favoriteMovie);
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error adding favorite movie", error: error.message });
  }
}
