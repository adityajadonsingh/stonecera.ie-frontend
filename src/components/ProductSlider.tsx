"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types";
import ProductCard from "./product/ProductCard";

export default function ProductSlider({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <>
      <section className="product-slider py-8 bg-[#F5F5DC66]">
        <div className="container">
          <h2 className="headingH2 text-center mb-8">{title}</h2>
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
              400: { slidesPerView: 2 },
              700: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {
                products.map((product, i) => {
                    return <SwiperSlide key={i}> <ProductCard data={product}/></SwiperSlide>
                })
            }
          </Swiper>
        </div>
      </section>
    </>
  );
}
