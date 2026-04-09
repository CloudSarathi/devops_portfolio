import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type Block =
  | { type: "text"; value: string }
  | { type: "image"; value: string };

type Project = {
  id?: number;
  title: string;
  slug: string;
  content: Block[]; // ✅ NEW
  tags: string[];
  date: string;
};

const DB_NAME = "blog";
const COLLECTION = "projects";

/* ✅ GET */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const projects = await db
      .collection(COLLECTION)
      .find({})
      .sort({ id: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/* ✅ CREATE */
export async function POST(req: Request) {
  try {
    const body: Project = await req.json();

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const newProject = {
      id: Date.now(),
      title: body.title,
      slug: body.slug,
      content: body.content || [], // ✅ safe default
      tags: body.tags || [],
      date: body.date,
      createdAt: new Date(),
    };

    await db.collection(COLLECTION).insertOne(newProject);

    return NextResponse.json({ success: true, data: newProject });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

/* ✅ UPDATE */
export async function PUT(req: Request) {
  try {
    const body: Project = await req.json();

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection(COLLECTION).updateOne(
      { id: body.id },
      {
        $set: {
          title: body.title,
          slug: body.slug,
          content: body.content || [],
          tags: body.tags || [],
          date: body.date,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

/* ✅ DELETE */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection(COLLECTION).deleteOne({ id });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}