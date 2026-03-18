import type { Metadata } from "next";
import { Baloo_2, Quicksand, Bungee_Shade } from "next/font/google";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bungeeShade = Bungee_Shade({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "InviteEra – Create Beautiful Digital Invitations & Live Countdown Timers",
  description:
    "Create stunning digital invitations with live countdown timers for weddings, baby showers, birthdays, and every milestone worth celebrating. Share via WhatsApp, Instagram, email, or print at home.",
  keywords: [
    "online invitation maker",
    "digital invitations",
    "wedding invitation website",
    "event invitations",
    "RSVP tracking",
    "countdown timer",
    "birthday invitation maker",
    "wedding invitations"
  ],
  openGraph: {
    title: "InviteEra – Beautiful Digital Invitations",
    description:
      "Create stunning digital invitations with live countdown timers for your special moments.",
    url: "https://InviteEra.com",
    siteName: "InviteEra",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo2.variable} ${quicksand.variable} ${bungeeShade.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
