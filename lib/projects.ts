import clientPromise from "@/lib/mongodb";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const client = await clientPromise;
    const db = client.db("blog");

    const projects = await db
      .collection<Project>("projects") // ✅ typed collection
      .find({})
      .sort({ id: -1 })
      .toArray();

    return projects;
  } catch (err) {
    console.error(err);
    return [];
  }
}