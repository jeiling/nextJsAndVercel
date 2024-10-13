'use client'
import localFont from "next/font/local";
import "./globals.css";
import { StyledEngineProvider } from '@mui/material/styles';
import {CssBaseline} from '@mui/material'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <CssBaseline/>
      <body
        id="root"
        className={`${geistSans.variable} ${geistMono.variable} antialiased mt-10 justify-center flex`}
      >
        {children}
      </body>
      </StyledEngineProvider>
    </html>
  );
}
