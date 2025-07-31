// src/components/ContactForm.tsx
"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setCurrentTime = () => {
    const TIME_ZONE = 1000 * 60 * 60 * 9;
    const resultTime = new Date(new Date().getTime() + TIME_ZONE)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);
    return String(resultTime);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!;
    const sheetForm = document.getElementById(
      "submit-to-google-sheet"
    ) as HTMLFormElement;

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(sheetForm),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      console.log("Success!", res);
      sheetForm.reset();
      setForm({ name: "", email: "", phone: "", message: "" });
      alert("전송을 성공하였습니다.");
    } catch (error: any) {
      console.error("Error!", error);
      alert("전송 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="submit-to-google-sheet"
      onSubmit={onSubmit}
      className="mx-20 space-y-6 p-6 flex flex-col"
    >
      <h2 className="text-4xl font-bold text-left">Contact Us</h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          required
          className="w-full border-b px-3 py-2 focus:outline-none"
        />
        <input
          className="hidden"
          name="time"
          defaultValue={setCurrentTime()}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          이메일 주소
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full border-b px-3 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          연락처
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          required
          className="w-full border-b px-3 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          내용
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          required
          className="w-full border-b px-3 py-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-end w-50 cursor-pointer bg-maincolor-500 text-white py-2 px-6 rounded hover:bg-maincolor-300 disabled:opacity-50 transition"
      >
        {submitting ? "전송 중…" : "전송하기"}
      </button>
    </form>
  );
}
