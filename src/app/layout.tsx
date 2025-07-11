import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Video Co",
  description: "영상 제작 회사 홈페이지",
  icons: {
    icon: "/favicon.ico", // public/favicon.ico를 가리킴
    shortcut: "/favicon.ico", // shortcut icon (구 브라우저)
    // apple: "/apple-touch-icon.png" // iOS 홈화면용 아이콘이 있으면 추가
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <SiteHeader /> {/* 일반 헤더는 여기서 조건부 렌더링 */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
