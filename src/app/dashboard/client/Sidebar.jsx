"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dots9 } from "@gravity-ui/icons";

const navItems = [
  { name: "Update Profile", href: "/dashboard/client/profile-update" },
  { name: "Heiring history", href: "/dashboard/client/history" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href) => {
    const isActive = pathname === href;

    return `
      block px-3 py-2 rounded transition
      ${isActive ? "bg-gray-800 text-white" : "text-gray-800"}
      hover:bg-gray-800 hover:text-white
    `;
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-16 w-full p-2 bg-gray-900 text-white"
      >
        <Dots9 />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-24 left-0 min-h-screen w-64
          bg-gray-200 p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-8">Client Dashboard</h1>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={linkClass(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}