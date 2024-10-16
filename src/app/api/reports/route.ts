import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, details, location, imageUrl } = await req.json();

  if (!userId || !details || !location) {
    return NextResponse.json(
      { error: "UserId, details, and location are required" },
      { status: 400 }
    );
  }

  try {
    const report = await prisma.report.create({
      data: {
        userId,
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    let reports;
    if (userId) {
      reports = await prisma.report.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      reports = await prisma.report.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Error fetching reports" },
      { status: 500 }
    );
  }
}
