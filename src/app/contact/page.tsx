// src/app/contact/page.tsx
import React from "react";
import Link from "next/link";
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
              <p>allref0214@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold">주소</h3>
              <p>서울특별시 노원구 노해로 491, 4층</p>
            </div>
            <div>
              <Link
                href="https://www.youtube.com/@%EB%AA%A8%EB%91%90%EC%9D%98%EB%A0%88%ED%8D%BC%EB%9F%B0%EC%8A%A4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-16 h-8 -translate-x-2"
              >
                {/* SVG 로고 */}
                <svg
                  width="10"
                  height="44"
                  viewBox="0 0 500.23315 216.02286"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="m210.53177,221.29866c0,0 98.12514,0 122.46443,-6.48069 13.70449,-3.6724 24.01093,-14.2575 27.62825,-27.32688 6.68807,-23.97854 6.68807,-74.41988 6.68807,-74.41988 0,0 0,-50.117297 -6.68807,-73.879819C357.00713,25.79798 346.70069,15.42887 332.9962,11.864515 308.65691,5.2758072 210.53177,5.2758072 210.53177,5.2758072c0,0 -97.9062,0 -122.135976,6.5887078 -13.485335,3.564355 -24.010529,13.933465 -27.847831,27.326876 -6.468588,23.762522 -6.468588,73.879819 -6.468588,73.879819 0,0 0,50.44134 6.468588,74.41988 3.837302,13.06938 14.362496,23.65448 27.847831,27.32688 24.229776,6.48069 122.135976,6.48069 122.135976,6.48069z"
                    fill="#FF0000"
                  />
                  <path
                    d="M259.30109,113.28723 178.29251,67.382379v91.809711z"
                    fill="#FFFFFF"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
