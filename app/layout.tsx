import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const font = Nunito_Sans({
  weight: ["400", "600", "700"],
  style: "normal",
  preload: false,
});

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
      <body className={`${font.className} antialiased`}>
        <div className="p-4 space-y-4 mx-auto max-w-[500px]">
          <h1 className="text-xl font-extrabold text-green-800">
            CourtFeeCalc
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
