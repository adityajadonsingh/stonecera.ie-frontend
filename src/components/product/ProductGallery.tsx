"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper"; // ✅ import type for swiper instance
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { ProductImage } from "@/types";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null); // ✅ properly typed
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <div className="product-img-box flex lg:flex-row flex-col-reverse gap-4 lg:w-full md:w-6/12 w-full mx-auto">
        {/* Thumbnails Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          watchSlidesProgress
          slidesPerView={4}
          spaceBetween={10}
          className="lg:w-24 w-full prod-thumb lg:h-auto h-24"
          breakpoints={{
            0: {
              direction: "horizontal",
            },
            991: {
              direction: "vertical",
            },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full cursor-pointer">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
{/* Main Swiper */}
<Swiper
  modules={[Navigation, Thumbs]}
  navigation
  thumbs={{ swiper: thumbsSwiper }}
  className="flex-1 w-full md:h-[400px] h-[350px] lg:h-[500px]"
>
  {images.map((img, index) => (
    <SwiperSlide key={index}>
      <div className="relative w-full lg:h-[500px] md:h-[400px] h-[350px]">
        <Image
          src={img.url}
          alt={img.alt}
          fill
          className="object-cover"
        />
        <button
          onClick={() => {
            setLightboxIndex(index);
            setLightboxOpen(true);
          }}
          className="absolute top-4 right-4 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <i className="bi bi-zoom-in text-xl text-gray-800"></i>
        </button>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      </div>
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((img) => ({
          src: img.url,
          description: img.alt,
        }))}
        plugins={[Zoom, Thumbnails]}
      />
    </>
  );
}
