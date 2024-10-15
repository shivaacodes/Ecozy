import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, address, phone } = await req.json();
  const role = "RESIDENT";

  if (!name || !address || !phone) {
    return NextResponse.json(
      { error: "Name, address, and phone are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        address,
        phone,
        role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
