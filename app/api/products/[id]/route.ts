import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = req.url.split("/").pop();


  if (!id) {
    return NextResponse.json({ message: "ID fehlt" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json({
    ...product,
    price: Number(product.price),
  });
}
