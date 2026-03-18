"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // ⭐ hide navbar on admin routes
  if (pathname.startsWith("/admin")) return null;

  return <FloatingNavbar />;
}