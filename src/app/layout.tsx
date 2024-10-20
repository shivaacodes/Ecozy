import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

// const geistSans = localFont({
//   src: "@public/fonts/",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-heading",
});

const fontSubHeading = localFont({
  src: "../../assets/fonts/product-font.ttf",
  variable: "--font-subheading",
});

const fontHeaderAlt = localFont({
  src: "../../assets/fonts/cd-semi.otf",
  variable: "--font-headingAlt",
});

export const metadata: Metadata = {
  title: "Eco - Thrissur's Green Revolution",
  description:
    "Join us in making Thrissur a greener, cleaner, and more sustainable city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={` ${fontHeaderAlt.variable} ${fontHeading.variable}${fontSubHeading.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
