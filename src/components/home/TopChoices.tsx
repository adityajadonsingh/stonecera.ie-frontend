"use client";

import Link from "next/link";
import Image from "next/image";
import { Category, HomeCategorySilder } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function TopChoices({ allCategories, data }: { allCategories: Category[]; data: HomeCategorySilder }) {
  return (
    <section className="top-choices md:py-10 py-5">
      <div className="container">
        <div className="grid lg:grid-cols-2 md:grid-cols-[70%_30%] grid-cols-1 items-center">
          <div className="left-side md:text-start text-center">
            <h2 className="headingH2">{data.title}</h2>
            <p className="lg:pt-4 pt-2">
              {data.subtitle}
            </p>
          </div>
          <div className="right-side flex items-center md:justify-end justify-center mt-4 md:mt-0">
            <Link href={"/product-category/"}><button className="btnType-1">Explore All Categories</button></Link>
          </div>
        </div>

        {/* ✅ Swiper Slider with Arrows */}
        <div className="pt-8 relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 4 }, // lg and up
              768: { slidesPerView: 3 }, // md
              0: { slidesPerView: 2 }, // mobile
            }}
          >
            {allCategories.map((category, idx) => (
              <SwiperSlide key={`category-${idx}`}>
                <Link href={`/product-category/${category.slug}/`}>   
                  <div className="card relative lg:h-[400px] sm:h-[320px] h-[230px] group overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.image_alt_tag}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                   <div className="overlay"></div>
                                            <span className="absolute text-center w-full md:px-4 px-1 md:pb-0 pb-3 z-10 !text-white md:text-xl text-base font-semibold capitalize bottom-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2">
                                                {category.name}
                                            </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="swiper-button-prev flex items-center justify-center nav-btns"></div>
          <div className="swiper-button-next flex items-center justify-center nav-btns"></div>
        </div>
      </div>
    </section>
  );
}
