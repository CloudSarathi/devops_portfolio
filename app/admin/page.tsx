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

  /* ⭐ single safe init effect */
  useEffect(() => {
    const init = async () => {
      const admin = localStorage.getItem("admin") === "true";
      setLoggedIn(admin);

      if (admin) {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      }
    };

    init();
  }, []);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "Cloudsarathi" && password === "devops123") {
      localStorage.setItem("admin", "true");
      setLoggedIn(true);
      loadProjects();
    } else {
      alert("Invalid login");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setLoggedIn(false);
  };

  const addProject = async () => {
    const payload: Project = {
      id: editingId || Date.now(),
      slug: slug || title.toLowerCase().replaceAll(" ", "-"),
      title,
      description,
      cover,
      date: new Date().toDateString(),
      tags: tags.split(",").map(t => t.trim())
    };

    await fetch("/api/projects", {
      method: editingId ? "PUT" : "POST",
      body: JSON.stringify(payload)
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
      body: JSON.stringify({ id })
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

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    setDescription(
      (prev) =>
        prev +
        `\n<img src="${data.url}" alt="blog image" style="border-radius:12px; margin:20px 0;" />\n`
    );
  };

  /* ⭐ important hydration guard */
  if (loggedIn === null) {
    return null;
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <form onSubmit={login} className="bg-white p-10 rounded-xl shadow w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

          <input
            placeholder="username"
            className="w-full border p-3 mb-4 rounded-md"
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            className="w-full border p-3 mb-4 rounded-md"
            onChange={e => setPassword(e.target.value)}
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
        className="
        text-5xl font-extrabold w-full mb-6 outline-none
        resize-none overflow-hidden leading-tight
        "
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height =
            e.currentTarget.scrollHeight + "px";
        }}
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
        <button
          onClick={() => setDescription(p => p + "\n**bold text**\n")}
          className="px-3 py-1 bg-white border rounded"
        >
          Bold
        </button>

        <button
          onClick={() => setDescription(p => p + "\n*italic text*\n")}
          className="px-3 py-1 bg-white border rounded"
        >
          Italic
        </button>

        <button
          onClick={() => setDescription(p => p + "\n- list item\n")}
          className="px-3 py-1 bg-white border rounded"
        >
          Bullet
        </button>

        <button
          onClick={() =>
            setDescription(
              p =>
                p +
                "\n```bash\nsudo apt update\nsudo apt install nginx\n```\n"
            )
          }
          className="px-3 py-1 bg-white border rounded"
        >
          Code
        </button>

        <button
          onClick={() =>
            setDescription(
              p =>
                p +
                "\n[Visit Github](https://github.com)\n"
            )
          }
          className="px-3 py-1 bg-white border rounded"
        >
          Link
        </button>
      </div>

      {/* SPLIT EDITOR */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT TEXT EDITOR */}
        <textarea
          placeholder="Write blog markdown content..."
          className="w-full h-[520px] border rounded-xl p-5 text-lg leading-8"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* RIGHT LIVE PREVIEW */}
        <div className="w-full h-[520px] border rounded-xl p-6 overflow-y-auto bg-gray-50">
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>

      </div>

      {/* PUBLISH */}
      <button
        onClick={addProject}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl text-lg"
      >
        {editingId ? "Update Blog" : "Publish Blog"}
      </button>

    </div>
  </div>
);
}