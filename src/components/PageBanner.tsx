import React from "react";
import Image from "next/image"
import Link from "next/link";
interface bread {
    slugName: string;
    slug: string;
}

export default function PageBanner({ bgImg, bgImgAlt, pageName, breadcrum, categoryContent }: { bgImg: string; bgImgAlt: string; pageName: string; breadcrum: bread[]; categoryContent: string | null | undefined; }) {
    return (
        <>
            <section className="page-banner relative">
                <Image
                    src={bgImg}
                    alt={bgImgAlt}
                    fill
                    priority
                    className="object-cover z-0"
                />
                <div className="container h-full w-full flex justify-center flex-col relative z-10">
                    <h1 className="headingH1">{pageName}</h1>
                    {
                        categoryContent && <p className="!text-white w-8/12">{categoryContent}</p>
                    }
                </div>
            </section>
            <div className="breadcrum bg-[#F6F6F2] py-2">
                <div className="container">
                    <ul className="flex gap-x-2 font-semibold text-[#B2AC88]">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>/</li>
                        {
                            breadcrum.map((bread, idx) => {
                                if (idx === breadcrum.length - 1) {
                                    return (
                                        <li key={`bread-last-${idx}`}>{bread.slugName}</li>
                                    )
                                }

                                return (
                                    <React.Fragment key={`bread-frag-${idx}`}>
                                        <li><Link href={bread.slug}>{bread.slugName}</Link></li>
                                        <li>/</li>
                                    </React.Fragment>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}