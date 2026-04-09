"use client";

import Link from "next/link";

import { Mail, Github, Linkedin, Instagram, Video } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const text = "ಕ್ಲೌಡ್ ಮತ್ತು ಡೆವ್ಒಪ್ಸ್ ತಂತ್ರಜ್ಞಾನ";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-40 pb-28 px-6">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Glow spotlight */}
      <div className="absolute -z-10 -top-50 left-1/2 -translate-x-1/2 w-200 h-200 bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm
        rounded-full border border-gray-300 dark:border-gray-700
        bg-white/40 dark:bg-white/5 backdrop-blur"
        >
          🚀 Cloud Sarathi Tech Community
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight
        text-gray-900 dark:text-white leading-tight"
        >
          Learn Cloud
          <span
            className="bg-linear-to-r from-blue-500 to-indigo-500
          bg-clip-text text-transparent"
          >
            {" "}
            DevOps{" "}
          </span>
          Together
        </h1>

        {/* Typing animation */}
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-mono h-6">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A developer community focused on Cloud, DevOps and modern engineering.
          Learn real-world skills, explore projects, and grow together with
          Cloud Sarathi.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            href="/projects"
            className="px-8 py-3 font-medium text-white
            rounded-lg bg-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:bg-blue-700 hover:scale-105"
          >
            Explore Projects
          </Link>

          <Link
            href="/blogs"
            className="px-8 py-3 font-medium rounded-lg
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-white
            backdrop-blur
            transition-all duration-300
            hover:bg-gray-100 dark:hover:bg-gray-800
            hover:scale-105"
          >
            Read Blogs
          </Link>
        </div>

        {/* Tech badges */}
        <div className="mt-14 flex justify-center flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            Docker
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            Kubernetes
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            AWS
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            Terraform
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            CI/CD
          </span>
        </div>
      </div>
    </section>
  );
}
