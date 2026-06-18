"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Person,
  ArrowRightFromSquare,
  Bars,
  Xmark,
} from "@gravity-ui/icons";

export default function Navbar({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!user;

  return (
    <nav className="bg-[#0081E0] text-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            LegalEasy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/lawyers">Lawyers</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
                    <Person className="w-5 h-5" />
                  </div>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg border border-white px-4 py-2 hover:bg-white hover:text-[#0081E0]"
                >
                  <ArrowRightFromSquare className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>

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
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/services" onClick={() => setIsOpen(false)}>
                Services
              </Link>

              <Link href="/lawyers" onClick={() => setIsOpen(false)}>
                Lawyers
              </Link>

              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>

              <hr className="border-blue-400" />

              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    ) : (
                      <Person className="w-5 h-5" />
                    )}

                    <span>{user?.displayName || "Profile"}</span>
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
                  <Link href="/login">Login</Link>

                  <Link
                    href="/register"
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