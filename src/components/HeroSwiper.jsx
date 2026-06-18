"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Find Verified Lawyers",
    desc: "Browse trusted legal experts across multiple categories.",
  },
  {
    title: "Hire Instantly",
    desc: "Connect with lawyers and start consultations in minutes.",
  },
  {
    title: "Secure Platform",
    desc: "All lawyers go through verification and admin approval.",
  },
];

export default function HeroSwiper() {
  return (
    <div className="relative z-10 rounded-2xl bg-white shadow-xl border p-6 h-[320px] md:h-[420px]">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        className="h-full"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              
              <div className="w-16 h-16 rounded-full bg-[#0081E0]/10 flex items-center justify-center mb-5">
                ⚖️
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                {item.title}
              </h2>

              <p className="mt-3 text-sm md:text-base text-slate-500">
                {item.desc}
              </p>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}