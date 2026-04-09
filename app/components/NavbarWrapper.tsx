"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// ⭐ load navbar only on client (VERY IMPORTANT)
const FloatingNavbar = dynamic(() => import("./navbar"), {
  ssr: false,
});

export default function NavbarWrapper() {
  const pathname = usePathname();

  // ⭐ hide navbar on admin routes
  if (pathname.startsWith("/admin")) return null;

  return <FloatingNavbar />;
}