import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { StoreProvider } from "@/store/storeProvider";
import SnackbarNotification from "@/components/Snackbar";
import { theme } from "@/styles/theme";

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

export const metadata: Metadata = {
  title: "Dgreen Otowash",
  description: "Dashboard Dgreen Otowash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <SnackbarNotification />
        </StoreProvider>
      </body>
    </html>
  );
}
