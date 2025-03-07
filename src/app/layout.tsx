import type { Metadata } from "next";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextProvider, NextLayout } from "@/providers/NextProvider";

export const metadata: Metadata = {
  title: "Next Restaurant Map App",
  description: "Next13을 이용한 부산 맛집 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NextProvider>
          <NextLayout>
            {children}           
          </NextLayout>          
        </NextProvider>        
      </body>
    </html>
  );
}
