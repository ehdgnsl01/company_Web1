import type { Metadata } from "next";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedLayout from "@/components/AnimatedLayout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "모두의 레퍼런스",
  description: "영상 제작 전문 회사 모두의 레퍼런스입니다. ",
  icons: {
    icon: "/allref_favicon.ico",
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
      <meta
        name="naver-site-verification"
        content="eeeb1083e49ada707859e97d1ed303ede947f417"
      />
      <meta name="google-site-verification" content="H--3NmnC3xnQiaInBVgKWtAqDtceHNANCD-aK0x09eQ" />
      <body>
        <SiteHeader /> {/* 일반 헤더는 여기서 조건부 렌더링 */}
        <ScrollToTop />
        <AnimatedLayout>
          <main className="pt-20 bg-black">{children}</main>
        </AnimatedLayout>
        <Footer />
      </body>
    </html>
  );
}
