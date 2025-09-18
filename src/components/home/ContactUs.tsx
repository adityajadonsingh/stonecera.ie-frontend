"use client";

import { useState } from "react";
import Image from "next/image";
import { sendEnquiry } from "@/lib/api";
import { HomeContact } from "@/types";

export default function ContactUs({ data }: { data: HomeContact }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
    product_name: null
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendEnquiry(formData);
      setStatus("Message sent successfully ✅");
      setFormData({ name: "", email: "", phone_number: "", message: "", product_name: null });
    } catch (err) {
      setStatus("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-home md:py-10 py-5 scroll-mt-24" id="contact-us">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] items-center">
          {/* Left Side */}
          <div className="left-side md:text-start text-center md:pr-8 md:w-full sm:w-10/12 mx-auto">
            <h2 className="headingH2 mb-4">{data.title}</h2>
            <p className="mb-6 text-gray-600">
              {data.sub_heading}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 rounded-md">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded bg-[#f2f2e8]"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded bg-[#f2f2e8]"
                  required
                />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone*"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="p-3 rounded bg-[#f2f2e8]"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 rounded bg-[#f2f2e8] h-32"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#a8a17e] text-white py-3 px-6 hover:bg-[#8c855f] cursor-pointer transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {status && (
                <p
                  className={`text-md mt-2 ${status.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>

          <div className="right-side hidden md:block">
            <Image
              src={data.image}
              alt={data.alt_tag}
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
