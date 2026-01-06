import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "BongoVibe",
  description: "BongoVibe - Michezo, Simulizi, Elimu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
