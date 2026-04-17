import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    const projectId = Number(data.get("projectId"));

    if (!file || !projectId) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await writeFile(path.join(uploadDir, fileName), buffer);

    const fileUrl = `/uploads/${fileName}`;

    const client = await clientPromise;
    const db = client.db("blog");

    // ✅ Append image to description
    await db.collection("projects").updateOne(
      { id: projectId },
      {
        $push: {}, // nothing needed
      }
    );

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}