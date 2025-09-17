// components/product/ContactPopup.tsx
"use client";

import React, { useEffect, useState } from "react";
import { sendEnquiry } from "@/lib/api";
import type { HomeContact } from "@/types";

interface ContactPopupProps {
  productName: string;
  data?: HomeContact; // optional if you want custom title/image
}

export default function ContactPopup({ productName, data }: ContactPopupProps) {
  const defaultData: HomeContact = {
    title: "Enquire About This Product",
    sub_heading: "Fill the form and we’ll get back to you soon.",
    image: "",
    alt_tag: "",
  };

  const contactData = data ?? defaultData;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topMessage, setTopMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
    product_name: productName ?? "",
  });

  // keep product_name in sync if prop changes
  useEffect(() => {
    setFormData((f) => ({ ...f, product_name: productName ?? "" }));
  }, [productName]);

  // disable body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTopMessage(null);

    try {
      // ensure product_name is included
      const payload = { ...formData, product_name: productName ?? formData.product_name };

      await sendEnquiry(payload); // uses your existing API helper

      // close modal and show success
      setOpen(false);
      setTopMessage({ text: "Form submitted ✅ We will contact you soon.", type: "success" });

      // reset form
      setFormData({ name: "", email: "", phone_number: "", message: "", product_name: productName ?? "" });

      // hide after 4s
      setTimeout(() => setTopMessage(null), 4000);
    } catch (err) {
      setTopMessage({ text: "Something went wrong ❌ Please try again.", type: "error" });
      setTimeout(() => setTopMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button (place this where you want the button to appear in the SSR page) */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#B2AC88] font-semibold block cursor-pointer mt-4 text-white px-6 py-2 hover:bg-[#867f54] transition"
      >
        Enquire Now
      </button>

      {/* Top sliding message */}
      {topMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] rounded-lg px-6 py-3 shadow-lg animate-slideDown ${
            topMessage.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {topMessage.text}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="headingH2 mb-2">{contactData.title}</h2>
            <p className="mb-6 text-gray-600">{contactData.sub_heading}</p>

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

              {/* hidden product name so payload includes it (also kept in state) */}
              <input type="hidden" name="product_name" value={formData.product_name ?? productName} />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#a8a17e] text-white py-3 px-6 hover:bg-[#8c855f] cursor-pointer transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-120%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.45s ease-out forwards;
        }
      `}</style>
    </>
  );
}
