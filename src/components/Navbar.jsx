"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Person,
  ArrowRightFromSquare,
  Bars,
  Xmark,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import Search from "./Search";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const userSession = session?.user || null;

  const navLinkClass = (path) =>
    `transition font-medium hover:text-yellow-200 ${
      pathname === path ? "text-yellow-300 font-semibold" : "text-white"
    }`;

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
          toast.success("Logged out successfully");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0081E0] text-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            LegalEasy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link
              href="/browse-lawyers"
              className={navLinkClass("/browse-lawyers")}
            >
              Browse Lawyers
            </Link>

            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className={`transition font-medium hover:text-yellow-200 ${
                  pathname.startsWith("/dashboard")
                    ? "text-yellow-300 font-semibold"
                    : "text-white"
                }`}
              >
                Dashboard
              </button>

              {isDashboardOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md bg-white text-[#0081E0] shadow-lg overflow-hidden">
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setIsDashboardOpen(false)}
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    Admin
                  </Link>

                  <Link
                    href="/dashboard/lawyer"
                    onClick={() => setIsDashboardOpen(false)}
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    Lawyer
                  </Link>

                  <Link
                    href="/dashboard/client"
                    onClick={() => setIsDashboardOpen(false)}
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    Client
                  </Link>
                </div>
              )}
            </div>
          </div>




  
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {userSession ? (
              <>
                {userSession.image ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image
                      src={userSession.image}
                      alt={userSession.name || "Profile"}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
                    <Person className="w-5 h-5" />
                  </div>
                )}

                <span className="max-w-[120px] truncate">
                  {userSession.name || "User"}
                </span>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg border border-white px-4 py-2 transition hover:bg-white hover:text-[#0081E0]"
                >
                  <ArrowRightFromSquare className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={navLinkClass("/login")}>
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-white px-4 py-2 text-[#0081E0]"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <Xmark className="w-7 h-7" />
            ) : (
              <Bars className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-blue-400 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={navLinkClass("/")}
              >
                Home
              </Link>

              <Link
                href="/browse-lawyers"
                onClick={() => setIsOpen(false)}
                className={navLinkClass("/browse-lawyers")}
              >
                Browse Lawyers
              </Link>

              {/* Mobile Dashboard */}
              <div className="flex flex-col gap-2">
                <span className="font-medium text-white">Dashboard</span>

                <Link
                  href="/dashboard/admin"
                  onClick={() => setIsOpen(false)}
                  className="pl-3 text-white/90 hover:text-yellow-200"
                >
                  Admin
                </Link>

                <Link
                  href="/dashboard/lawyer"
                  onClick={() => setIsOpen(false)}
                  className="pl-3 text-white/90 hover:text-yellow-200"
                >
                  Lawyer
                </Link>

                <Link
                  href="/dashboard/client"
                  onClick={() => setIsOpen(false)}
                  className="pl-3 text-white/90 hover:text-yellow-200"
                >
                  Client
                </Link>
              </div>

              <hr className="border-blue-400" />
              <Search/>
              {userSession ? (
                <>
                  <div className="flex items-center gap-3">
                    {userSession.image ? (
                      <div className="h-9 w-9 overflow-hidden rounded-full border border-white">
                        <Image
                          src={userSession.image}
                          alt={userSession.name || "Profile"}
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white">
                        <Person className="w-5 h-5" />
                      </div>
                    )}

                    <span>{userSession.name || "Profile"}</span>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2"
                  >
                    <ArrowRightFromSquare className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className={navLinkClass("/login")}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-white px-4 py-2 text-center text-[#0081E0]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}