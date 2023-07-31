import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nana's Memories",
  description: "A place to store old photos and memories of Nana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
