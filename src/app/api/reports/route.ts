import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, title, description, details, location, imageUrl } =
    await req.json();

  // Validate the required fields
  if (!userId || !title || !description || !details || !location) {
    return NextResponse.json(
      {
        error: "UserId, title, description, details, and location are required",
      },
      { status: 400 }
    );
  }

  try {
    const report = await prisma.report.create({
      data: {
        userId,
        title,
        description,
        details,
        location,
        imageUrl,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Error creating report" },
      { status: 500 }
    );
  }
}
