import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Svitlana — UI designer",
  description: "Portfolio of Svitlana, UI designer for websites and web products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
