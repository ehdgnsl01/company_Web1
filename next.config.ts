// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 필요에 따라 reactStrictMode, swcMinify 등 옵션 추가 가능
  webpack(config, { isServer }) {
    // SVG를 React 컴포넌트로 불러오기 위한 SVGR 설정
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // svgr 옵션 예시: icon: true 로 뷰박스 자동 조정
            icon: true,
            // svgr 내보내기 스타일: React 컴포넌트로 default export
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      // 뷰박스 손실 방지
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
