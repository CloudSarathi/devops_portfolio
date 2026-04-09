import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "blog";
const COLLECTION = "projects";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    const projectId = Number(data.get("projectId")); // 👈 important

    if (!file || !projectId) {
      return NextResponse.json({ success: false, error: "Missing data" });
    }

    // ✅ Convert file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Unique name
    const fileName = Date.now() + "-" + file.name;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    // ✅ Save file locally
    await writeFile(`${uploadDir}/${fileName}`, buffer);

    const fileUrl = `/uploads/${fileName}`;

    // ✅ Save URL in MongoDB (linked to project)
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection(COLLECTION).updateOne(
      { id: projectId },
      {
        $push: {
          images: fileUrl, 
        },
      }
    );

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}