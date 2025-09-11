"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function CategorySlider({ allCategories }: { allCategories: Category[] }) {
    return (
        <>
            <section className="category-slider py-10">
                <div className="container">
                    <div className=" relative">
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
                                768: { slidesPerView: 2 }, // md
                                0: { slidesPerView: 1 }, // mobile
                            }}
                        >
                            {allCategories.map((category, idx) => (
                                <SwiperSlide key={`category-${idx}`}>
                                    <Link href={`/product-category/${category.slug}/`}>
                                        <div className="card relative h-[450px] group overflow-hidden">
                                            <Image
                                                src={category.image}
                                                alt={category.image_alt_tag}
                                                fill
                                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                            <div className="overlay"></div>
                                            <span className="absolute text-center w-full px-4 z-10 !text-white text-xl font-medium capitalize bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
        </>
    )
}