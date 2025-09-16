"use client";

import { useEffect, useState } from "react";
import { getProductReviews, submitReview } from "@/lib/api";
import { Review } from "@/types";

export default function ReviewSection({
  slug,
  productId,
}: {
  slug: string;
  productId: number;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      getProductReviews(productId).then(setReviews).catch(console.error);
    }
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productId) return;

    setLoading(true);
    try {
      await submitReview({ ...form, productId });
      setForm({ name: "", email: "", comment: "", rating: 5 });
      const updated = await getProductReviews(productId);
      setReviews(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="my-10 bg-[#f3f3eb] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#867f54]">
          Customer Reviews
        </h2>

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {reviews.map((r) => (
              <li key={r.id} className="border-b border-[#d1cfb8] pb-3">
                <p className="font-semibold">{r.name}</p>
                <p className="text-yellow-500">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
                <p className="text-[#867f54]">{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6 text-[#867f54]">No reviews yet. Be the first!</p>
        )}

        {/* Review Form */}
        <h4 className="mt-5 text-2xl font-bold mb-4 text-[#867f54]">Add your review</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-2 border border-[#d1cfb8]"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-2 border border-[#d1cfb8]"
          />
          <textarea
            placeholder="Your Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
            className="w-full p-2 border border-[#d1cfb8]"
          />

          {/* Star Rating */}
          <div className="flex items-center gap-x-3">
            <span className="text-[#b2ac88]">Rating : </span>
            <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`text-2xl ${
                  form.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#B2AC88] cursor-pointer text-white px-6 py-2 hover:bg-[#867f54] transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
