"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import ThemeToggle from "./theme-toggle";

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);
  
  const pathname = usePathname();

  const isClient = typeof window !== "undefined";

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Showcase", href: "/showcase" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <>
      {/* ===== FLOATING NAVBAR ===== */}
      <div
        className={`fixed top-4 left-0 right-0 z-1000 flex justify-center ${
          open ? "pointer-events-none" : ""
        }`}
      >
        <nav
          className="
          w-[92%] max-w-6xl
          bg-white/70 dark:bg-[#020617]/70
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          shadow-xl
          rounded-4xl
          px-5 py-2
          flex items-center justify-between
        "
        >
          {/* logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={130}
              height={28}
              className="dark:hidden h-auto w-auto"
              priority
            />
            <Image
              src="/logo1.png"
              alt="logo"
              width={130}
              height={28}
              className="hidden dark:block h-auto w-auto"
              priority
            />
          </Link>

          {/* desktop menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-medium transition hover:text-blue-500 ${
                  pathname === l.href
                    ? "text-blue-500"
                    : "text-black dark:text-white"
                }`}
              >
                {l.name}
              </Link>
            ))}

            <Search className="cursor-pointer" />
            <ThemeToggle />
          </div>

          {/* mobile button */}
          <button
            className="md:hidden text-black dark:text-white mr-3"
            onClick={() => setOpen(true)}
          >
            <Menu size={30} />
          </button>
        </nav>
      </div>

      {/* ===== MOBILE MENU (PORTAL) ===== */}
      {isClient &&
        createPortal(
          <div
            className={`fixed inset-0 z-9999 transition-all duration-300 ${
              open
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* drawer panel */}
            <div
              className={`absolute top-0 right-0 h-full w-[82%] max-w-sm
              bg-white dark:bg-[#020617]
              shadow-2xl p-8 flex flex-col
              transition-transform duration-300
              ${open ? "translate-x-0" : "translate-x-full"}`}
            >
              {/* close */}
              <div className="flex justify-end mb-10">
                <button onClick={() => setOpen(false)}>
                  <X size={36} className="text-black dark:text-white" />
                </button>
              </div>

              {/* links */}
              <div className="flex flex-col gap-8 text-lg font-medium">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-black dark:text-white"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>

              {/* bottom */}
              <div className="mt-auto pt-16 flex justify-between items-center">
                <Search className="text-black dark:text-white" size={24} />
                <ThemeToggle />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}