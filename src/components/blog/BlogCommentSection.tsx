"use client";

import { useEffect, useState } from "react";
import { getBlogComments, submitBlogComment } from "@/lib/api";
import { BlogComment } from "@/types";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function BlogCommentSection({ blogId }: { blogId: number }) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getBlogComments(blogId).then(setComments).catch(() => setComments([]));
  }, [blogId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await submitBlogComment({ ...form, blogId });
      setForm({ name: "", email: "", comment: "" });
      setMessage("Thank you. Your comment is waiting for admin approval.");
    } catch {
      setMessage("Sorry, your comment could not be submitted. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 bg-[#f3f3eb] p-6 rounded-sm">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {comments.length > 0 ? (
        <ul className="space-y-4 mb-6">
          {comments.map((item) => (
            <li key={item.id} className="border-b border-[#d1cfb8] pb-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <p className="font-semibold text-[#867f54]">{item.name}</p>
                <span className="text-sm text-[#b2ac88]">
                  {formatDateTime(item.updatedAt || item.createdAt)}
                </span>
              </div>
              <p className="text-[#867f54]">{item.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6">No approved comments yet. Be the first to comment.</p>
      )}

      <h3 className="text-xl font-bold mb-4">Leave a comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border border-[#d1cfb8] bg-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-2 border border-[#d1cfb8] bg-white"
        />
        <textarea
          placeholder="Your Comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          required
          rows={5}
          className="w-full p-2 border border-[#d1cfb8] bg-white"
        />

        {message && <p className="text-sm text-[#867f54]">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#B2AC88] cursor-pointer text-white px-6 py-2 hover:bg-[#867f54] disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </section>
  );
}
