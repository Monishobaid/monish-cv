import type { Metadata, Viewport } from "next";
import { Manrope, Caveat, Inclusive_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const inclusive = Inclusive_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-inclusive",
});

export const metadata: Metadata = {
  title: "Monish Obaid — building Berri",
  description:
    "Software developer in Dublin, MSc Computing (AI, NLP) at DCU. Co-founder of Berri, an always-on-top workspace for macOS with 40+ active users and 30+ paying customers.",
  metadataBase: new URL("https://monishobaid.tech"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${caveat.variable} ${inclusive.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
