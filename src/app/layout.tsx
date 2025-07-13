import type { Metadata } from "next";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "모두의 레퍼런스",
  description: "영상 제작 회사 홈페이지",
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
      <body>
        <SiteHeader /> {/* 일반 헤더는 여기서 조건부 렌더링 */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
