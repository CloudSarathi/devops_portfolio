"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Showcase", href: "/showcase" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
      <div
        className="flex items-center justify-between px-14 py-2
      bg-white dark:bg-[#000319]
      backdrop-blur-lg shadow-xl rounded-full
      border border-gray-200 dark:border-gray-700"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Cloud Sarathi"
            width={160}
            height={30}
            priority
            className="object-contain dark:hidden"
          />

          <Image
            src="/logo1.png"
            alt="Cloud Sarathi"
            width={160}
            height={30}
            priority
            className="hidden dark:block object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-md font-medium items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition hover:text-blue-500
                ${
                  pathname === link.href
                    ? "text-blue-500"
                    : "text-black dark:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <button className="text-black dark:text-white hover:text-blue-500 transition">
            <Search size={20} />
          </button>

          <ThemeToggle />
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black dark:text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
