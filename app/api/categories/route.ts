import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ categories });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};