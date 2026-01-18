"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import DetailNavbar from "@/components/detail-navbar";

export default function NavbarSwitcher() {
  const pathname = usePathname() || "/";

  // Map some known subpaths to detail navbar keys
  if (pathname.startsWith("/team")) return <DetailNavbar currentPage="team" />;
  if (pathname.startsWith("/course")) return <DetailNavbar currentPage="course" />;
  if (pathname.startsWith("/list")) return <DetailNavbar currentPage="list" />;
  if (pathname.startsWith("/list")) return <DetailNavbar currentPage="pricing" />;
  if (pathname.startsWith("/gallery")) return <DetailNavbar currentPage="gallery" />;

  // Default: use main Navbar (home and other routes)
  return <Navbar />;
}
