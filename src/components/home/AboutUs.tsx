import { HomeAbout } from "@/types"
import Image from "next/image"
import Link from "next/link"
export default function AboutUs({data}:{data: HomeAbout}){
    return (
        <>
            <section className="home-about md:py-10 py-5">
                <div className="container">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3">
                        <div className="img-side md:min-h-[450px] min-h-[300px] md:w-full sm:w-8/12 w-10/12 mx-auto h-full relative">
                            <Image 
                                src={data.image}
                                alt={data.alt_tag}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="content-side md:pl-8 md:text-start text-center">
                            <h2 className="headingH2">{data.title}</h2>
                            <p className="pt-4">{data.description}</p>
                            <Link href={"/about-us/"}>
                                <button className="btnType-1 mt-4">Read More <i className="bi bi-arrow-right ml-2"></i></button>
                            </Link>
                            <div className="grid sm:grid-cols-4 grid-cols-2 gap-y-4 mt-8">
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