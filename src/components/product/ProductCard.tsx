import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"
export default function ProductCard({data}:{data:Product}) {
    return (
        <>
            <Link href={`/product-category/${data.category?.slug}/${data.slug}/`}>
                <div className="card group">
                    <div className="img-box md:h-[300px] sm:h-[250px] h-[220px] relative overflow-hidden">
                        <Image
                            src={data.image}
                            alt={data.image_alt_tag}
                            className="object-cover group-hover:scale-105"
                            fill
                        />
                        <button className="absolute py-1 font-semibold bg-[#F9F9FA] text-[#867F54] w-11/12 bottom-0 mb-3 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition ">Know More</button>
                    </div>
                    <span className="block text-center md:text-lg text-base font-semibold capitalize mt-2 text-[#867F54]">{data.name}</span>
                </div>
            </Link>
        </>
    )
}