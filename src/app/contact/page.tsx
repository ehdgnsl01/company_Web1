// src/app/contact/page.tsx
import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-black py-16 px-4 min-h-screen text-white">
      <div className="mx-auto flex flex-col md:flex-row gap-12">
        {/* Left: Contact Form */}
        <div className="md:w-1/2">
          <ContactForm />
        </div>

        {/* Right: Company Info */}
        <div className="md:w-1/2 space-y-6 py-20 text-left">
          <h2 className="text-2xl font-bold mb-10">Contact Information</h2>
          <div className="space-y-4 flex flex-col gap-10">
            <div>
              <h3 className="font-semibold">전화번호</h3>
              <p>010-3350-3725</p>
            </div>
            <div>
              <h3 className="font-semibold">이메일</h3>
              <p>info@allref.com</p>
            </div>
            <div>
              <h3 className="font-semibold">주소</h3>
              <p>서울특별시 노원구 노해로 491, 4층</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
