import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const font = Nunito_Sans({
  weight: ["400","600", "700"],
  style: "normal",
  preload: false,
})

export const metadata: Metadata = {
  title: "CourtFeeCalc",
  description: "Calculate the court fee for your group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
