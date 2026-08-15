import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type GrowthAILayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function GrowthAILayout({
  children,
}: GrowthAILayoutProps) {
  return children;
}
