import { ShortsTable } from "./shorts-table";
import { shortsSource } from "@/lib/source";

export async function ShortsGrid({ folder }: { folder: string }) {
  const { renderToString } = await import("react-dom/server");

  const allPages = await shortsSource.getPages();

  // Filter pages by folder and render MDX to HTML
  const pages = allPages
    .filter((p) => p.file.dirname.startsWith(folder))
    .map((p) => ({
      slug: p.url,
      title: p.data.title ?? "Untitled",
      description: p.data.description ?? "",
      html: p.data.body ? renderToString(<p.data.body />) : "<p>No content</p>",
      category: p.data.category ?? "Uncategorized",
    }));

  return <ShortsTable pages={pages} />;
}
