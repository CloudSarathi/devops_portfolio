"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered =
    search.trim() === ""
      ? projects
      : projects.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">

      {/* HERO */}
      <div className="flex justify-center mb-20">
        <div className="
          px-10 py-6 rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-[0_0_30px_rgba(0,0,0,0.6)]
        ">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Latest DevOps Projects
          </h1>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-16 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl
          bg-white/5 border border-white/10
          text-white focus:outline-none focus:border-blue-500"
        />
        <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading projects...</p>
      )}

      {/* LIST */}
      <div className="space-y-12">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.015 }}
            className="
            relative overflow-hidden
            p-10 md:p-12
            rounded-3xl
            bg-[linear-gradient(120deg,rgba(30,41,59,0.9),rgba(15,23,42,0.95))]
            border border-blue-500/20
            shadow-[0_0_60px_rgba(0,0,0,0.6)]
            hover:border-blue-400/40
            transition-all duration-300
          "
          >
            {/* glow overlay */}
            <div className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_40%)]
              pointer-events-none
            "/>

            {/* DATE */}
            <div className="mb-6">
              <span className="
                inline-flex items-center gap-2
                text-sm px-5 py-2 rounded-xl
                bg-linear-to-r from-blue-500/20 to-purple-500/20
                text-blue-300 border border-blue-400/20
                backdrop-blur-md
              ">
                📅 {project.date}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 max-w-4xl">
              {project.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
              {project.description.substring(0, 30)}...
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="
                  text-xs px-3 py-1.5 rounded-lg
                  bg-blue-500/10 text-blue-300
                  border border-blue-400/20
                ">
                  {tag}
                </span>
              ))}
            </div>

            {/* READ MORE */}
            <Link
              href={`/projects/${project.id}`}
              className="text-blue-400 text-sm font-medium hover:text-blue-300"
            >
              Read more →
            </Link>
          </motion.div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No matching projects found
        </p>
      )}
    </section>
  );
}