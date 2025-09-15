import { Category } from "@/types";
import Link from "next/link"
import Image from "next/image";

export default function Footer({ allCategories, phone, email, address, instagram_link, facebook_link, linkedin_link, twitter_link, pinterest_link }: { allCategories: Category[]; phone: string; email: string; address: string; instagram_link: string; facebook_link: string; linkedin_link: string; twitter_link: string; pinterest_link: string; }) {
    return (<>
        <footer className="footer py-10 bg-[#F3F3EB]">
            <div className="container">
                <div className="grid grid-cols-4">
                    <div className="foot-colm">
                        <h4 className="font-semibold text-xl mb-4">Stonecera</h4>
                        <ul className="flex flex-col gap-y-2">
                            <li>
                                <Link href={"/about-us/"}>About Us</Link>
                            </li>

                            {/* <li>
                                <Link href={"/blogs/"}>Blogs</Link>
                                </li> */}
                            <li>
                                <Link href={"/product-category/"}>Product Category</Link>
                            </li>
                            <li>
                                <Link href={"/products/"}>Products</Link>
                            </li>
                            <li>
                                <Link href={"/brochures/"}>Brochures</Link>
                            </li>
                            <li>
                                <Link href={"/contact-us/"}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="foot-colm">
                        <h4 className="font-semibold text-xl mb-4">Categories</h4>
                        <ul className="flex flex-col gap-y-2">

                            {
                                allCategories.map((category, idx) => {
                                    return (<li key={`${category.name}+${idx}`}>
                                        <Link href={`/product-category/${category.slug}/`}>
                                            {category.name}
                                        </Link>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="foot-colm pr-4">
                        <h4 className="font-semibold text-xl mb-4">Contact Us</h4>
                        <ul className="flex flex-col gap-y-4">
                            <li className="flex gap-x-2">
                                <div className="icn bg-[#B2AC88] w-[30px] h-[30px] flex justify-center items-center">
                                    <Image
                                        src={"/media/icons/call-footer.png"}
                                        alt="call-footer"
                                        width={17}
                                        height={17}
                                    />
                                </div>
                                <Link className="block foot-links" href={`tel:${phone}`}>{phone}</Link>
                            </li>
                            <li className="flex gap-x-2">
                                <div className="icn bg-[#B2AC88] w-[30px] h-[30px] flex justify-center items-center">
                                    <Image
                                        src={"/media/icons/mail-footer.png"}
                                        alt="mail-footer"
                                        width={17}
                                        height={17}
                                    />
                                </div>
                                <Link className="block foot-links" href={`mailto:${email}`}>{email}</Link>
                            </li>
                            <li className="flex gap-x-2">
                                <div className="icn bg-[#B2AC88] w-[30px] h-[30px] flex justify-center items-center">
                                    <Image
                                        src={"/media/icons/location.png"}
                                        alt="location-footer"
                                        width={17}
                                        height={15}
                                    />
                                </div>
                                <span className="text-[#867f54] foot-links">{address}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="foot-colm">
                        <h4 className="font-semibold text-xl mb-4">Locate Us</h4>
                        <div className="w-full h-52">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.7235033035936!2d-7.854998187403469!3d51.95723337180196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48436d0e612df11d%3A0x13282b54f18c86f!2s9%20Tallow%20St%2C%20Youghal-Lands%2C%20Youghal%2C%20Co.%20Cork%2C%20P36%20YE14%2C%20Ireland!5e0!3m2!1sen!2sin!4v1757489344543!5m2!1sen!2sin%22"
                                width="100%"
                                height="100%"
                                style={{ border: 0, outline: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="btm-footer mt-5">
                    <ul className="flex gap-x-4 mb-5">
                        <li><Link href={linkedin_link}><Image src={"/media/icons/linkedin.png"} alt="linkedin" width={40} height={40} /></Link></li>
                        <li><Link href={facebook_link}><Image src={"/media/icons/facebook.png"} alt="linkedin" width={40} height={40} /></Link></li>
                        <li><Link href={twitter_link}><Image src={"/media/icons/x.png"} alt="x" width={40} height={40} /></Link></li>
                        <li><Link href={instagram_link}><Image src={"/media/icons/insta.png"} alt="linkedin" width={40} height={40} /></Link></li>
                        <li><Link href={pinterest_link}><Image src={"/media/icons/pintrest.png"} alt="pinterest" width={40} height={40} /></Link></li>
                    </ul>
                    <ul className="flex gap-x-4 text-[#B2AC88]">
                        <li><span>@2025 stonecera all rights reserved</span></li>
                        <li><Link href={"/privacy-policy/"}>Privacy Policy</Link></li>
                        <li><Link href={"/terms-and-conditions/"}>Terms of use</Link></li>
                    </ul>

                </div>

            </div>
        </footer>
        <div className="whatsapp-float">
            <a href="https://wa.me/+447467648124" target="_blank">
                <div className="icn">
                    <i className="bi bi-whatsapp"></i>
                </div>
            </a>
        </div>
    </>)
}