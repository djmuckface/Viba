import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import HeaderWrapper from "./components/HeaderWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Viba",
  description: "Your personal motivational companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans bg-white antialiased`}>
        <Providers>
          <HeaderWrapper />
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
