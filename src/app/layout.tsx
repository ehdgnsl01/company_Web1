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
  title: "모두의 레퍼런스",
  description:
    "TV 광고, 바이럴 필름, 모션그래픽, 기업 브랜드 필름을 기획, 제작",
  keywords: [
    "영상 제작",
    "기업 홍보 영상",
    "제품 소개 영상",
    "이벤트 영상",
    "영상 편집",
    "모두의 레퍼런스",
    "all reference",
    "모션그래픽",
    "기업 브랜드 필름",
    "TV 광고",
    "바이럴 필름",
  ],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "모두의 레퍼런스",
    description:
      "TV 광고, 바이럴 필름, 모션그래픽, 기업 브랜드 필름을 기획, 제작",
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
    title: "모두의 레퍼런스",
    description:
      "TV 광고, 바이럴 필름, 모션그래픽, 기업 브랜드 필름을 기획, 제작",
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
    "@type": "ProfessionalService",
    name: "모두의 레퍼런스",
    url: siteUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "010-3350-3725",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: ["Korean"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울특별시 노원구 노해로 491, 4층",
      addressLocality: "노원구",
      addressRegion: "서울특별시",
      postalCode: "01709",
      addressCountry: "KR",
    },
  };

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="naver-site-verification"
          content="ead00e2bc84ea3acec4bb1c2fc08348598690d10"
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
