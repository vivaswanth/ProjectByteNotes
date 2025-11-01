import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      nav={{ ...baseOptions.nav }}
      tree={source.pageTree}
      sidebar={{ collapsible: true }}
    >
      {children}
    </DocsLayout>
  );
}
