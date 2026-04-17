import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateSlug } from "@/lib/slug";


const DB_NAME = "blog";
const COLLECTION = "projects";

/* ✅ GET */
export async function GET() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const projects = await db
    .collection(COLLECTION)
    .find({})
    .sort({ id: -1 })
    .toArray();

  return NextResponse.json(projects);
}

/* ✅ CREATE */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const slug =  generateSlug(body.title);

    const newProject = {
      id: body.id || Date.now(),
      title: body.title,
      slug,
      description: body.description || "", // ✅ MAIN CONTENT
      tags: (body.tags || []).filter((t: string) => t.trim()),
      date: body.date,
      createdAt: new Date(),
    };

    await db.collection(COLLECTION).insertOne(newProject);

    return NextResponse.json({ success: true, data: newProject });
  } catch {
    return NextResponse.json(
      { success: false, error: "Create failed" },
      { status: 500 }
    );
  }
}

/* ✅ UPDATE */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection(COLLECTION).updateOne(
      { id: body.id },
      {
        $set: {
          title: body.title,
          slug: generateSlug(body.title),
          description: body.description,
          tags: body.tags,
          date: body.date,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}

/* ✅ DELETE */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db(DB_NAME);

  await db.collection(COLLECTION).deleteOne({ id });

  return NextResponse.json({ success: true });
}