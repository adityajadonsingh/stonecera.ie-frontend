"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Testimonal } from "@/types";

export default function Testimonials({ testimonials }: { testimonials: Testimonal[] }) {
  return (
    <section className="relative testimonials py-16">
      <Image
        src="/media/testimonials-bg.png"
        alt="testimonials"
        fill
        priority
        className="object-cover z-0"
      />

      <div className="container overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-center headingH2 !text-white mb-12">
            What Our Customers Say About us
          </h2>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            loop
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="p-6 rounded-xl shadow-md bg-white text-center mx-auto">
                  <h3 className="text-lg font-semibold mb-3">{t.name}</h3>
                  <p className="text-gray-600">{t.testimonial}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
