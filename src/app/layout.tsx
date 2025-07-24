// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedLayout from "@/components/AnimatedLayout";
import Footer from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.allreference.co.kr";
const ogImage = `${siteUrl}/images/twitter_card.png`;

export const metadata: Metadata = {
  title: "모두의 레퍼런스 – 영상 제작 전문 회사",
  description:
    "모두의 레퍼런스는 기업 홍보 영상, 제품 소개 영상, 이벤트 영상 등 맞춤형 영상 제작 서비스를 제공합니다.",
  keywords: [
    "영상 제작",
    "기업 홍보 영상",
    "제품 소개 영상",
    "이벤트 영상",
    "영상 편집",
    "모두의 레퍼런스",
    "all reference",
  ],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "모두의 레퍼런스 – 영상 제작 전문 회사",
    description:
      "기업 홍보, 제품 소개, 이벤트 영상까지—모두의 레퍼런스가 고객의 이야기를 영상으로 완성합니다.",
    url: siteUrl,
    siteName: "모두의 레퍼런스",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1100,
        height: 740,
        alt: "모두의 레퍼런스 대표 영상 스틸 이미지",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "모두의 레퍼런스 – 영상 제작 전문 회사",
    description:
      "기업 홍보, 제품 소개, 이벤트 영상까지—모두의 레퍼런스가 고객의 이야기를 영상으로 완성합니다.",
    images: [ogImage],
  },
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "모두의 레퍼런스",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "02-1234-5678",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: ["Korean"],
    },
  };

  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="eeeb1083e49ada707859e97d1ed303ede947f417"
        />
        <meta
          name="google-site-verification"
          content="H--3NmnC3xnQiaInBVgKWtAqDtceHNANCD-aK0x09eQ"
        />
        <script
          type="application/ld+json"
          // JSON-LD needs dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader />
        <ScrollToTop />
        <AnimatedLayout>
          <main className="pt-20 bg-black">{children}</main>
        </AnimatedLayout>
        <Footer />
      </body>
    </html>
  );
}
