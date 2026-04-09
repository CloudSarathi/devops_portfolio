"use client";

import { useState } from "react";
import { projects } from "@/data/showcase-projects";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Showcase() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-5 pt-32 pb-20">
      {/* Title */}
      <h1
        className="text-4xl font-bold text-center mb-4
      bg-linear-to-r from-blue-500 to-indigo-500
      bg-clip-text text-transparent"
      >
        More DevOps Resources
      </h1>

      <p className="text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
        Explore practical DevOps projects, automation pipelines, and
        cloud-native architectures.
      </p>

      {/* Animated List */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            rounded-xl p-6
            backdrop-blur
            hover:border-blue-500/40
            transition
            shadow-sm dark:shadow-none
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {project.desc}
                </p>
              </div>

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="text-blue-500 dark:text-blue-400"
              >
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Expandable Section */}
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="
                        text-xs
                        bg-blue-100 dark:bg-blue-500/10
                        text-blue-600 dark:text-blue-400
                        px-2 py-1
                        rounded
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
