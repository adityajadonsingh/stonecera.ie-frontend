"use client";

import { BrochurePage } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function BrochureGrid({ data }: { data: BrochurePage }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {data.brochures.map((b) => {
        return (
          <div key={b.id} className="card relative">
            {/* Whole card is clickable to view PDF */}
            <Link href={b.pdf?.url} target="_blank">
              <div className="h-[200px] relative">
                <Image
                  src={b.thumbnail_image?.url}
                  alt={b.brochure_name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();

                const response = await fetch(b.pdf.url);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = b.brochure_name + ".pdf";
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(blobUrl);
              }}
              className="absolute cursor-pointer top-3.5 right-1.5 z-20 px-2 py-1 text-white bg-[#b2ac88] rounded-sm hover:bg-white hover:text-[#b2ac88]"
            >
              <i className="bi bi-download"></i>
            </button>

            <span className="text-center mt-2 block text-lg text-[#b2ac88] font-semibold">
              {b.brochure_name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
