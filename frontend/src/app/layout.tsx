import type { Metadata } from "next";
import { Playfair_Display, Sacramento, EB_Garamond } from "next/font/google";
import { AmbientBackground, ScrollProgressBar, StickyBookButton } from "@/features/chrome";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ai-Nativ | Clone Camp, Nairobi",
  description:
    "Ai-Nativ Founders stop being their own content team. Clone Camp builds your headshots, cloned voice, and 30 day content roadmap live in one Saturday in Nairobi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${sacramento.variable} ${ebGaramond.variable}`}
    >
      <body>
        <AmbientBackground />
        <ScrollProgressBar />
        {children}
        <StickyBookButton />
      </body>
    </html>
  );
}
