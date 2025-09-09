"use client";

import { useState } from "react";
import Image from "next/image";
import { sendEnquiry } from "@/lib/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
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
      setFormData({ name: "", email: "", phone_number: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-home py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] items-center">
          {/* Left Side */}
          <div className="left-side pr-8">
            <h2 className="headingH2 mb-4">Get in Touch With us</h2>
            <p className="mb-6 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s.
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
                  className={`text-md mt-2 ${
                    status.includes("successfully")
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
              src="/media/demo-3.png"
              alt="Contact"
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
