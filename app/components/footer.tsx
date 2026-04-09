"use client";

import { Mail, Github, Linkedin, Instagram, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" w-full">
      <div
        className="
        w-[94%] max-w-full mx-auto
        px-10 py-10
        rounded-2xl
        bg-white dark:bg-[#000319]
        border border-gray-200 dark:border-gray-700
        shadow-lg
        text-center
      "
      >
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 text-gray-500 dark:text-gray-400">
          <a
            href="mailto:youremail@gmail.com"
            className="hover:text-blue-500 transition"
          >
            <Mail size={20} />
          </a>

          <a
            href="https://github.com"
            className="hover:text-blue-500 transition"
          >
            <Github size={20} />
          </a>

          <a
            href="https://linkedin.com"
            className="hover:text-blue-500 transition"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://instagram.com"
            className="hover:text-blue-500 transition"
          >
            <Instagram size={20} />
          </a>

          <a
            href="https://youtube.com"
            className="hover:text-blue-500 transition"
          >
            <Video size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-700 w-40 mx-auto"></div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ByCloudSarathi | © 2026
        </p>

        {/* Made with love */}
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Made with <span className="text-red-500">❤</span> by
          <span className="tracking-widest ml-2">
            Cloud Sarathi Tech Community
          </span>
        </p>
      </div>
    </footer>
  );
}
