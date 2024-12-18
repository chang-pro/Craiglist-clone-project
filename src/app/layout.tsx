// src/app/layout.tsx
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Classified Marketplace",
  description: "Your trusted marketplace platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main>
            {/* Add authentication buttons */}
            <div className="absolute top-4 right-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}