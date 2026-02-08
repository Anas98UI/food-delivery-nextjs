import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const catSlug = searchParams.get("cat");
    const isFeatured = searchParams.get("featured");

    const where: any = {};
    
    if (catSlug) {
      where.catSlug = catSlug;
    }
    
    if (isFeatured === "true") {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
    });

    const serializedProducts = products.map((p) => ({
      ...p,
      price: Number(p.price),
    }));

    return NextResponse.json({ products: serializedProducts });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};