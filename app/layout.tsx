import "@fortawesome/fontawesome-free/css/all.min.css";

import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "../public/font/MonaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/MonaSans-Regular.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-myfont",
});

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={myFont.variable}>
      <body className="font-myfont">{children}</body>
    </html>
  );
}
