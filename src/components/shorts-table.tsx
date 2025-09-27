"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

interface Page {
  slug: string;
  title: string;
  description?: string;
  html: string;
  category: string; // now dynamic
}

export function ShortsTable({ pages }: { pages: Page[] }) {
  // Get unique categories
  const categories = Array.from(new Set(pages.map(p => p.category)));

  // Group pages by category
  const pagesByCategory: Record<string, Page[]> = {};
  categories.forEach(cat => {
    pagesByCategory[cat] = pages.filter(p => p.category === cat);
  });

  // Determine max rows
  const maxRows = Math.max(...Object.values(pagesByCategory).map(arr => arr.length));

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          {categories.map(cat => (
            <th key={cat} className="border px-4 py-2">{cat}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxRows }).map((_, i) => {
          const rowPages = categories.map((cat) => pagesByCategory[cat][i]);
          return (
            <tr key={i}>
              {categories.map((cat, j) => {
                const page = pagesByCategory[cat][i];
                if (!page) return <td key={j} className="border px-4 py-2"></td>;

                return (
                  <td key={j} className="border px-4 py-2">
                    {/* ShadCN Sheet Trigger */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="text-left text-blue-600 hover:underline">
                          {page.title}
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" style={{ maxWidth: "800px" }} className="w-[600px] max-w-none overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>{page.title}</SheetTitle>
                          <SheetDescription>{page.description}</SheetDescription>
                        </SheetHeader>
                        <div className="prose prose-sm p-4">
                          <article dangerouslySetInnerHTML={{ __html: page.html }}/>    
                        </div>
                      </SheetContent>
                    </Sheet>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
