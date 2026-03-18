import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

const filePath = path.join(process.cwd(), "data", "projects.json");

function readData(): Project[] {
  try {
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json || "[]");
  } catch {
    return [];
  }
}

function writeData(data: Project[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* ✅ GET → MUST RETURN ARRAY */
export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

/* CREATE */
export async function POST(req: Request) {
  const body = await req.json();
  const data = readData();

  body.id = Date.now();
  data.unshift(body);

  writeData(data);

  return NextResponse.json({ success: true });
}

/* UPDATE */
export async function PUT(req: Request) {
  const body = await req.json();
  let data = readData();

  data = data.map((p) => (p.id === body.id ? body : p));

  writeData(data);

  return NextResponse.json({ success: true });
}

/* DELETE */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  let data = readData();
  data = data.filter((p) => p.id !== id);

  writeData(data);

  return NextResponse.json({ success: true });
}