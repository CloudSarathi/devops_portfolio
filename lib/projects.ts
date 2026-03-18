import fs from "fs";
import path from "path";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

export function getProjects(): Project[] {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const json = fs.readFileSync(filePath, "utf-8");

    const data = JSON.parse(json || "[]");

    // support both array and wrapped structure
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.projects)) return data.projects;

    return [];
  } catch {
    return [];
  }
}