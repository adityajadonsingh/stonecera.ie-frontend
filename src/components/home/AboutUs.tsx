import Image from "next/image"
import Link from "next/link"
export default function AboutUs(){
    return (
        <>
            <section className="home-about py-10">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="img-side min-h-[450px] h-full relative">
                            <Image 
                                src={"/media/demo-2.png"}
                                alt="alt"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="content-side pl-8">
                            <h2 className="headingH2">Discover the perfect blend of Irish craftsmanship and timeless design. At Stonecera, we provide premium natural stone and ceramic solutions</h2>
                            <p className="pt-4">Welcome to Stonecera Ireland, your destination for exquisite surfaces that define beauty and durability. We are passionate about sourcing the highest quality stone and ceramic from around the world to bring your design visions to life. From the raw power of granite to the delicate elegance of porcelain, our collections are curated to meet the demands of both classic and contemporary Irish homes.</p>
                            <Link href={"/"}>
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