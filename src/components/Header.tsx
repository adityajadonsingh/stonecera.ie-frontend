"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

export default function Header({
  allCategories,
  phone,
  email,
}: {
  allCategories: Category[];
  phone: string;
  email: string;
}) {
  const [showFeatures, setShowFeatures] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setShowFeatures(false);
      } else {
        setShowFeatures(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header bg-[#F3F3EB] fixed z-[999] w-full ${
        !showFeatures ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container">
        <div className="grid py-2 grid-cols-[30%_40%_30%] max-[810px]:grid-cols-[40%_60%] items-center">
          {/* Logo */}
          <div className="logo">
            <Link href={"/"}>
              <Image
                src={"/media/logo.png"}
                alt="logo"
                priority
                width={80}
                height={100}
                className="w-16 h-auto md:w-20"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="main-nav flex justify-center items-center h-full w-full">
            <ul className="flex font-bold justify-center items-center whitespace-nowrap gap-x-4">
              <li>
                <Link
                  className="hover:text-[#B2AC88] text-[#867F54]"
                  href={"/about-us/"}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#B2AC88] text-[#867F54]"
                  href={"/products/"}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#B2AC88] text-[#867F54]"
                  href={"/brochures/"}
                >
                  Brochures
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#B2AC88] text-[#867F54]"
                  href={"/blogs/"}
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <div className="right-side flex justify-end items-center gap-x-5">
            {/* Search */}
            <div className="search-icn">
              <i className="bi bi-search cursor-pointer text-xl text-[#B2AC88] hover:text-[#867F54]"></i>
            </div>

            {/* CTA */}
            <div className="cta">
              <Link href={"/contact-us/"}>
                <button className="bg-[#B2AC88] hover:bg-[#867F54] cursor-pointer font-semibold text-white py-2 px-5">
                  Connect with us
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="menu-btn hidden text-[#867F54] text-3xl cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Category bar (desktop only) */}
      <div className="category bg-[#B2AC88] py-2 hidden md:block">
        <div className="container">
          <ul className="flex justify-center items-center gap-x-6">
            {allCategories.map((category, idx) => (
              <li key={`${category.name}+${idx}`}>
                <Link
                  className="text-white capitalize hover:text-[#f3f3eb]"
                  href={`/product-category/${category.slug}/`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features bar (desktop only) */}
      <div
        className={`header-features hidden md:block transition-all duration-200 overflow-hidden ${
          showFeatures ? "opacity-100 max-h-20 py-2" : "opacity-0 max-h-0"
        }`}
      >
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
              <span className="text-[#867F54] font-semibold text-sm">
                Nation wide fast delivery
              </span>
            </div>
            <div className="item flex items-center border-l border-r border-[#B2AC88] justify-center gap-x-4">
              <div className="icn">
                <Image
                  src="/media/icons/call.png"
                  alt="call"
                  width={19}
                  height={19}
                />
              </div>
              <Link href={`tel:${phone}`}>
                <span className="text-[#867F54] font-semibold text-sm">
                  {phone}
                </span>
              </Link>
            </div>
            <div className="item flex items-center justify-center gap-x-4">
              <div className="icn">
                <Image
                  src="/media/icons/mail.png"
                  alt="mail"
                  width={24}
                  height={17}
                />
              </div>
              <Link href={`mailto:${email}`}>
                <span className="text-[#867F54] font-semibold text-sm">
                  {email}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#F3F3EB] shadow-lg z-[1000] transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#B2AC88]">
          <span className="font-bold text-[#867F54]">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <i className="bi cursor-pointer bi-x text-3xl text-[#867F54]"></i>
          </button>
        </div>

        <ul className="flex flex-col p-4 gap-y-4 font-semibold text-[#867F54]">
          <li>
            <Link href={"/about-us/"} onClick={() => setSidebarOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link href={"/products/"} onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link href={"/brochures/"} onClick={() => setSidebarOpen(false)}>
              Brochures
            </Link>
          </li>
          <li>
            <Link href={"/blogs/"} onClick={() => setSidebarOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link href={"/contact-us/"} onClick={() => setSidebarOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
}
