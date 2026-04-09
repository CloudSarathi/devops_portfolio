"use client";
import { useEffect, useState, FormEvent } from "react";
import { Project } from "@/types/project";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  // ✅ FIXED EFFECT
  useEffect(() => {
    const admin = localStorage.getItem("admin") === "true";
    setLoggedIn(admin);
  }, []);

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn]);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "Cloudsarathi" && password === "devops123") {
      localStorage.setItem("admin", "true");
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setLoggedIn(false);
  };

  // ✅ AUTO CREATE BLOG
  const ensureProjectExists = async () => {
    if (editingId) return editingId;

    const newId = Date.now();

    const payload: Project = {
      id: newId,
      slug:
        slug ||
        (title ? title.toLowerCase().replaceAll(" ", "-") : "untitled"),
      title: title || "Untitled Blog",
      description,
      cover: "",
      date: new Date().toDateString(),
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to create blog");
      return null;
    }

    setEditingId(newId);
    return newId;
  };

  // ✅ IMAGE UPLOAD
  const uploadImage = async (file: File) => {
    const projectId = await ensureProjectExists();
    if (!projectId) return;

    const form = new FormData();
    form.append("file", file);
    form.append("projectId", String(projectId));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!data.success || !data.url) {
      alert("Upload failed");
      return;
    }

    setDescription(
      (prev) =>
        prev +
        `\n\n<img src="${data.url}" alt="blog image" style="border-radius:12px; margin:20px 0;" />\n\n`
    );
  };

  // ✅ SAVE BLOG
  const addProject = async () => {
    const payload: Project = {
      id: editingId || Date.now(),
      slug:
        slug ||
        (title ? title.toLowerCase().replaceAll(" ", "-") : "untitled"),
      title,
      description,
      cover,
      date: new Date().toDateString(),
      tags: tags.split(",").map((t) => t.trim()),
    };

    await fetch("/api/projects", {
      method: editingId ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });

    setTitle("");
    setSlug("");
    setDescription("");
    setTags("");
    setCover("");
    setEditingId(null);

    loadProjects();
  };

  const deleteProject = async (id: number) => {
    await fetch("/api/projects", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    loadProjects();
  };

  const editProject = (p: Project) => {
    setEditingId(p.id ?? null);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setTags(p.tags.join(","));
    setCover(p.cover ?? "");
  };

  // ✅ CLEAN BROKEN IMAGES
  const cleanDescription = description.replace(
    /<img src="undefined".*?>/g,
    ""
  );

  if (loggedIn === null) return null;

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <form onSubmit={login} className="bg-white p-10 rounded-xl shadow w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

          <input
            placeholder="username"
            className="w-full border p-3 mb-4 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            className="w-full border p-3 mb-4 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 text-white p-3 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* SIDEBAR */}
      <div className="w-72 bg-white border-r p-6">
        <h2 className="font-bold text-lg mb-5">All Posts</h2>

        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => editProject(p)}
            className="p-3 mb-3 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-semibold text-sm">{p.title}</h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(p.id!);
              }}
              className="text-xs text-red-500 mt-1"
            >
              delete
            </button>
          </div>
        ))}

        <button onClick={logout} className="mt-6 text-sm text-red-500">
          Logout
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1 bg-white p-12 overflow-y-auto">
        {/* IMAGE UPLOAD */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Upload Step Image
          </label>

          <input
            type="file"
            className="border p-3 rounded-lg w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
            }}
          />
        </div>

        {/* TITLE */}
        <textarea
          placeholder="Write your blog title..."
          rows={1}
          className="text-5xl font-extrabold w-full mb-6 outline-none resize-none overflow-hidden leading-tight"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* TAGS */}
        <input
          placeholder="Add tags comma separated"
          className="w-full border p-3 rounded-lg mb-6"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* TOOLBAR */}
        <div className="flex gap-3 border rounded-lg p-3 mb-4 bg-gray-50">
          <button onClick={() => setDescription(p => p + "\n**bold text**\n")}>Bold</button>
          <button onClick={() => setDescription(p => p + "\n*italic text*\n")}>Italic</button>
          <button onClick={() => setDescription(p => p + "\n- list item\n")}>Bullet</button>
        </div>

        {/* SPLIT EDITOR */}
        <div className="grid grid-cols-2 gap-6">
          <textarea
            className="w-full h-[520px] border rounded-xl p-5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="border rounded-xl p-6 bg-gray-50 overflow-y-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {cleanDescription}
            </ReactMarkdown>
          </div>
        </div>

        <button
          onClick={addProject}
          className="mt-8 bg-indigo-600 text-white px-10 py-4 rounded-xl"
        >
          {editingId ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </div>
  );
}