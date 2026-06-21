"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const sponsors = [
  "/images/sponsor1.jpg",
  "/images/sponsor2.jpg",
  "/images/sponsor3.jpg",
  "/images/sponsor4.jpg",
  "/images/sponsor5.jpg",
  "/images/sponsor6.jpg",
];

export default function SponsorsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Our Sponsors
          </h2>
          <p className="text-slate-500 mt-2">
            Trusted by leading organizations and partners
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {sponsors.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center p-4">
                <Image
                  src={logo}
                  alt={`Sponsor ${index + 1}`}
                  width={120}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}