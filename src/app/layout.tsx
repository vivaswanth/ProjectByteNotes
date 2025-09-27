import { fonts } from "@/lib/fonts";
import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme";

export const metadata = createMetadata({
  title: {
    template: "%s | The Byte Notes",
    default: "The Byte Notes - Consortium for tech articles",
  },
  description:
    "Personal articles on connecting dots, pretty much everything tech - programming, cloud, architecture, databases, devops, and more.",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex min-h-screen flex-col", fonts)} suppressHydrationWarning>
        <div className="fixed top-0 bottom-0  inset-y-0 left-0 w-1/14 bg-topography pointer-events-none"></div>
        <div className="fixed top-0 bottom-0  inset-y-0 right-0 w-1/14 bg-topography pointer-events-none"></div>
        <ThemeProvider>
          <RootProvider>{children}</RootProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
