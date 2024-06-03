import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/utils/SessionProvider";
import { ChakraProvider } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CESC DevDock",
  description: "The all in one resource database for CESC, founded 2024.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ChakraProvider>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar />
            {children}
          </div>
          </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
