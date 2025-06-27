// src/app/contact/page.tsx
"use client"; // 폼 제출 이벤트를 위해 클라이언트 컴포넌트로 선언

import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 이메일 전송 로직 추가
    alert(`Email: ${email}\nMessage: ${message}`);
  };

  return (
    <main className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </main>
  );
}
