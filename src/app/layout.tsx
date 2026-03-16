import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "트레킹네팔 | 네팔 히말라야 트레킹 전문 여행사",
  description:
    "네팔 트레킹 전문 여행사 트레킹네팔. 히말라야 트레킹 상품 구성, 예약, 결제까지 한번에. 안나푸르나, 에베레스트 베이스캠프 등 맞춤 트레킹 상담.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
