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
        <div className="product-img-box flex gap-4">
            {/* Thumbnails Swiper */}
            <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                modules={[Thumbs]}
                watchSlidesProgress
                slidesPerView={4}
                spaceBetween={10}
                className="w-24 hidden md:block prod-thumb"
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
                className="flex-1"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[500px]">
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
        </div>
    );
}
