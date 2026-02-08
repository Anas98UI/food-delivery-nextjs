import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "You are not authenticated!" },
      { status: 401 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const serializedOrders = orders.map((o) => ({
      ...o,
      price: Number(o.price),
    }));

    return NextResponse.json({ orders: serializedOrders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "You are not authenticated!" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { price, products } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found!" },
        { status: 404 }
      );
    }

    const order = await prisma.order.create({
      data: {
        price,
        products,
        status: "pending",
        userId: user.id,
      },
    });

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};