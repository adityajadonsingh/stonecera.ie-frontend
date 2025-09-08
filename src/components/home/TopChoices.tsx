import Link from "next/link";
import Image from "next/image";

export default function TopChoices() {
    return (
        <>
            <section className="top-choices py-10">
                <div className="container">
                    <div className="grid grid-cols-2">
                        <div className="left-side">
                            <h2 className="headingH2">Top Choices</h2>
                            <p className="pt-4">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div className="right-side flex items-center justify-end">
                            <button className="btnType-1 ">Connect with the team</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pt-8 gap-6">
                        <Link href={"/"}>
                            <div className="card relative h-[400px] group overflow-hidden">
                                <Image 
                                    src={"/media/demo-1.png"}
                                    alt={"alt"}
                                    fill
                                    className="object-fit group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[#867f54]/40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                                <span className="absolute z-10 text-white text-xl font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Product Name</span>
                            </div>
                        </Link>
                        <Link href={"/"}>
                            <div className="card relative h-[400px] group overflow-hidden">
                                <Image 
                                    src={"/media/demo-1.png"}
                                    alt={"alt"}
                                    fill
                                    className="object-fit group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[#867f54]/40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                                <span className="absolute z-10 text-white text-xl font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Product Name</span>
                            </div>
                        </Link>
                        <Link href={"/"}>
                            <div className="card relative h-[400px] group overflow-hidden">
                                <Image 
                                    src={"/media/demo-1.png"}
                                    alt={"alt"}
                                    fill
                                    className="object-fit group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[#867f54]/40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                                <span className="absolute z-10 text-white text-xl font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Product Name</span>
                            </div>
                        </Link>
                        <Link href={"/"}>
                            <div className="card relative h-[400px] group overflow-hidden">
                                <Image 
                                    src={"/media/demo-1.png"}
                                    alt={"alt"}
                                    fill
                                    className="object-fit group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[#867f54]/40 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                                <span className="absolute z-10 text-white text-xl font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Product Name</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}