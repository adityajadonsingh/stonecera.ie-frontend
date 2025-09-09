import Image from "next/image"
import Link from "next/link";
interface bread {
    slugName: string;
    slug: string;
}

export default function PageBanner({ bgImg, bgImgAlt, pageName, breadcrum }: { bgImg: string; bgImgAlt: string; pageName: string; breadcrum: bread[] }) {
    return (
        <>
            <section className="page-banner relative">
                <Image
                    src={bgImg}
                    alt={bgImgAlt}
                    fill
                    className="object-cover z-0"
                />
                <div className="container h-full w-full flex items-center relative z-10">
                    <h1 className="headingH1">{pageName}</h1>
                </div>
            </section>
            <div className="breadcrum bg-[#F6F6F2] py-2">
                <div className="container">
                    <ul className="flex gap-x-2 text-[#B2AC88]">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>/</li>
                        {
                            breadcrum.map((bread, idx) => {
                                if (idx == breadcrum.length - 1) {
                                    return (
                                        <li key={`bread-${idx}`}>{bread.slugName}</li>
                                    )
                                }
                                return (
                                    <li key={`bread-${idx}`}><Link href={bread.slug}>{bread.slugName}</Link></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}