"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-28">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-1 rounded-full bg-[#0081E0]/10 text-[#0081E0] text-sm font-medium"
            >
              Legal Marketplace Platform
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
            >
              <span className="bg-gradient-to-r from-[#0081E0]  to-[#44a8ef] bg-clip-text text-transparent font-bold">
                LegalEase
              </span> – Online Lawyer Hiring Platform
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 text-slate-600 text-lg leading-relaxed"
            >
              LegalEase connects legal seekers, clients, and businesses with
              verified lawyers. Browse, discover, and hire legal experts easily
              while lawyers manage services through a secure platform.
            </motion.p>

            {/* WHY BOX */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 p-5 rounded-xl bg-white border shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                Why this platform?
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Traditional legal hiring is limited to physical consultations.
                LegalEase democratizes access to legal services, empowers
                lawyers, and provides a secure hiring experience.
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <Link
                href="#"
                className="px-6 py-3 rounded-lg bg-[#0081E0] text-white font-medium hover:bg-[#006fbe] transition"
              >
                Get Started
              </Link>

              <Link
                href="#"
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Learn More
              </Link>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-xl border h-[320px] md:h-[420px]"
            >
              <Image
                src="/images/law.jpg"
                alt="Law Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#0081E0]/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-200/30 blur-3xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}