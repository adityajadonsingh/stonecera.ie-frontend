import { HomeAbout } from "@/types"
import Image from "next/image"
import Link from "next/link"
export default function AboutUs({data}:{data: HomeAbout}){
    return (
        <>
            <section className="home-about py-10">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="img-side min-h-[450px] h-full relative">
                            <Image 
                                src={data.image}
                                alt={data.alt_tag}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="content-side pl-8">
                            <h2 className="headingH2">{data.title}</h2>
                            <p className="pt-4">{data.description}</p>
                            <Link href={"/about-us/"}>
                                <button className="btnType-1 mt-4">Read More <i className="bi bi-arrow-right ml-2"></i></button>
                            </Link>
                            <div className="grid grid-cols-4 mt-8">
                                <div className="card flex justify-center items-center flex-col">
                                    <div className="icns relative flex justify-center items-center bg-[#F5F5DC] w-[90px] h-[90px]">
                                    <Image 
                                        src={"/media/icons/leaf.png"}
                                        alt="Sustanable"
                                        width={40}
                                        height={40}
                                    />
                                    
                                </div>
                                <span className="text-[#867F54] text-lg mt-1">Sustanable</span>
                                </div>
                                <div className="card flex justify-center items-center flex-col">
                                    <div className="icns relative flex justify-center items-center bg-[#F5F5DC] w-[90px] h-[90px]">
                                    <Image 
                                        src={"/media/icons/resistant.png"}
                                        alt="Resistant"
                                        width={40}
                                        height={40}
                                    />
                                    
                                </div>
                                <span className="text-[#867F54] text-lg mt-1">Resistant</span>
                                </div>
                                <div className="card flex justify-center items-center flex-col">
                                    <div className="icns relative flex justify-center items-center bg-[#F5F5DC] w-[90px] h-[90px]">
                                    <Image 
                                        src={"/media/icons/versatile.png"}
                                        alt="Versatile"
                                        width={40}
                                        height={40}
                                    />
                                    
                                </div>
                                <span className="text-[#867F54] text-lg mt-1">Versatile</span>
                                </div>
                                <div className="card flex justify-center items-center flex-col">
                                    <div className="icns relative flex justify-center items-center bg-[#F5F5DC] w-[90px] h-[90px]">
                                    <Image 
                                        src={"/media/icons/stylish.png"}
                                        alt="Stylish"
                                        width={40}
                                        height={40}
                                    />
                                    
                                </div>
                                <span className="text-[#867F54] text-lg mt-1">Stylish</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}