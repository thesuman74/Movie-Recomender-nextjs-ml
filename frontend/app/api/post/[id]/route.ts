import { NextResponse } from "next/server";

export function DELETE({
  req,
  params,
}: {
  req: Request;
  params?: { id: string };
}) {
  const id = params?.id;
  if (!id) {
    return NextResponse.json({ error: "No params provided" }, { status: 400 });
  }
  console.log({ id });
  return NextResponse.json({ id });
}
