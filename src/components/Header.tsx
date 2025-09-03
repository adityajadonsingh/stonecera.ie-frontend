import Link from "next/link"
import Image from "next/image"
import { Category } from "@/types"
export default function Header({ allCategories, phone, email }: { allCategories: Category[]; phone: string; email:string; }) {
    return (
        <>
            <header className="header  bg-[#F3F3EB]
">
                <div className="container">
                    <div className="grid py-2 grid-cols-[10%_70%_40%]">
                        <div className="logo">
                            <Link href={"/"}>
                                <Image
                                    src={"/media/logo.png"}
                                    alt="logo"
                                    priority
                                    width={80}
                                    height={100}
                                />
                            </Link>
                        </div>
                        <div className="main-nav flex justify-center items-center h-full w-full">
                            <ul className="flex uppercase font-medium justify-center items-center gap-x-4">
                                <li>
                                    <Link className="text-[#B2AC88] hover:text-[#867F54]" href={"/about-us/"}>
                                        ABOUT US
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-[#B2AC88] hover:text-[#867F54]" href={"/products/"}>
                                        PRODUCTS
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link className="text-[#B2AC88] hover:text-[#867F54]" href={"/product-catalogue/"}>
                                        BROUCHURE
                                    </Link>
                                </li> */}
                                <li>
                                    <Link className="text-[#B2AC88] hover:text-[#867F54]" href={"/blogs/"}>
                                        BLOGS
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-[#B2AC88] hover:text-[#867F54]" href={"/contact-us/"}>
                                        CONTACT US
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="right-side flex items-center gap-x-5">
                            <div className="search-icn">
                                <i className="bi bi-search cursor-pointer text-xl text-[#B2AC88] hover:text-[#867F54]"></i>
                            </div>
                            <div className="cta">
                                <button className="bg-[#B2AC88] hover:bg-[#867F54] cursor-pointer text-white py-2 px-5">
                                    CONNECT WITH US
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="category bg-[#B2AC88] py-2">
                    <div className="container">
                        <ul className="flex justify-center items-center gap-x-4  uppercase">
                            {
                                allCategories.map((category, idx) => {
                                    return (<li key={`${category.name}+${idx}`}>
                                        <Link className="text-white hover:text-[#f3f3eb]" href={`/product-category/${category.slug}/`}>
                                            {category.name}
                                        </Link>
                                    </li>)
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className="header-features py-2">
                    <div className="container">
                        <div className="grid grid-cols-3">
                            <div className="item flex items-center justify-center gap-x-4">
                                <div className="icn">
                                    <Image
                                    src="/media/icons/delivery-header.png"
                                    alt="delivery"
                                    width={44}
                                    height={23}
                                    />
                                </div>
                                <span className="text-[#867F54] font-semibold text-sm">Nation wide fast delivery</span>
                            </div>
                            <div className="item flex items-center border-l-1 border-r-1 border-[#B2AC88] justify-center gap-x-4">
                                <div className="icn">
                                    <Image
                                    src="/media/icons/call.png"
                                    alt="delivery"
                                    width={19}
                                    height={19}
                                    />
                                </div>
                                <Link href={`tel:${phone}`}><span className="text-[#867F54] font-semibold text-sm">{phone}</span></Link>
                            </div>
                            <div className="item flex items-center justify-center gap-x-4">
                                <div className="icn">
                                    <Image
                                    src="/media/icons/mail.png"
                                    alt="delivery"
                                    width={24}
                                    height={17}
                                    />
                                </div>
                                <Link href={`mailto:${email}`}><span className="text-[#867F54] font-semibold text-sm">{email}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}