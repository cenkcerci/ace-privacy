// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "PolicyGen",
  description: "Generate Privacy & Cookie Policies in 60 seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // IMPORTANT: Return a single <html> element and put Providers inside <body>
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Providers is a client component that wraps Clerk when keys exist */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
