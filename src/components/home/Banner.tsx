"use client";

import { Banner } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerSection({ banners }: { banners: Banner[];}) {

  return (
    <section className="home-banner w-full">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        className="h-full w-full"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={800}
        effect="slide"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            <div className="w-full h-full z-10  bg-gray-100 text-center relative slide-wraper">
              <div className="overlay"></div>
              <Image
                src={banner.image}
                alt={banner.image_alt_text ?? "Banner Image"}
                className="w-full h-full z-0 object-cover object-center"
                fill
                priority
              />
              <div className="container h-full">
                <div className="content-box relative z-10 flex flex-col pb-5 text-center justify-end items-center m-auto text-white lg:w-9/12 h-full">
                <h1 className="xl:text-5xl lg:text-3xl text-2xl font-bold mb-3 !text-white">
                  {banner.title}
                </h1>
                <p className="mb-4 lg:text-lg text-base !text-white">{banner.subtitle}</p>
                {/* <button
                  onClick={() => {
                    const el = document.getElementById("contact-section");
                    if (el) {
                      const yOffset = -100;
                      const y =
                        el.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="bg-[#f36c23] hover:bg-[#e76017] cursor-pointer font-semibold text-white px-6 py-2 rounded"
                >
                  {banner.enquiry_button_text}
                </button> */}
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
