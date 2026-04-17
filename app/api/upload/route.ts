import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import clientPromise from "@/lib/mongodb";

/* ================= TYPES ================= */

type ContentBlock = {
  type: "text" | "image";
  value: string;
};

type Project = {
  id: number;
  content: ContentBlock[];
  description?: string;
};

/* ================= CONFIG ================= */

const DB_NAME = "blog";
const COLLECTION = "projects";

/* ================= HELPERS ================= */

function contentToHTML(content: ContentBlock[] = []) {
  return content
    .map((block) => {
      if (block.type === "text") return block.value;

      if (block.type === "image") {
        return `<img src="${block.value}" style="border-radius:12px;margin:20px 0;max-width:100%;" />`;
      }

      return "";
    })
    .join("\n\n");
}

/* ================= API ================= */

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    const projectId = Number(data.get("projectId"));

    /* ========= VALIDATION ========= */

    if (!file || !projectId) {
      return NextResponse.json(
        { success: false, error: "Missing file or projectId" },
        { status: 400 }
      );
    }

    /* ========= FILE PROCESS ========= */

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await writeFile(path.join(uploadDir, fileName), buffer);

    const fileUrl = `/uploads/${fileName}`;

    /* ========= DATABASE ========= */

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const collection = db.collection<Project>(COLLECTION);

    /* ========= PUSH IMAGE ========= */
    const project = await collection.findOneAndUpdate(
      { id: projectId },
      {
        $push: {
          content: {
            type: "image",
            value: fileUrl,
          },
        },
      },
      {
        returnDocument: "after",
      }
    );

    /* ========= NULL CHECK ========= */

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    /* ========= UPDATE DESCRIPTION ========= */

    const updatedProject = project.value;

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const html = contentToHTML(updatedProject.content);

    await collection.updateOne(
      { id: projectId },
      {
        $set: {
          description: html,
        },
      }
    );

    /* ========= RESPONSE ========= */

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
