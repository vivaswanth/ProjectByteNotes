import { CodeListClient } from "./code-list-client";
import { shortsSource } from "@/lib/source";

export async function CodeList({ folder }: { folder: string }) {
  const { renderToString } = await import("react-dom/server");

  const allPages = await shortsSource.getPages();

  const pages = allPages
    .filter((p) => p.file.dirname.startsWith(folder))
    .map((p) => ({
      slug: p.url,
      title: p.data.title ?? "Untitled",
      description: p.data.description ?? "",
      html: p.data.body
        ? renderToString(<p.data.body />)
        : "<p>No content</p>",
      category: p.data.category ?? "Un-categorized",
      jsCode: p.data.jsCode ?? "",          // ⬅️ from frontmatter
      defaultInput: p.data.defaultInput ?? "", // ⬅️ from frontmatter
      cppCode: p.data.cppCode ?? "",
      javaCode: p.data.javaCode ?? "",
      pythonCode: p.data.pythonCode ?? ""
    }));

  return <CodeListClient pages={pages} />;
}
