"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Page {
  slug: string;
  title: string;
  description?: string;
  html: string;
  category: string;
}

export function ShortsGridClient({ pages }: { pages: Page[] }) {
  if (!pages || pages.length === 0) {
    return <p className="text-muted-foreground">No shorts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pages.map((page) => (
        <ShortCard key={page.slug} page={page} />
      ))}
    </div>
  );
}

function ShortCard({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>{page.title}</CardTitle>
          </CardHeader>
        </Card>
      </SheetTrigger>

      <SheetContent side="right" className="w-[600px] overflow-y-auto">
        <SheetHeader>
            <SheetTitle>{page.title}</SheetTitle>
            <SheetDescription>
                {page.description}
            </SheetDescription>
        </SheetHeader>
        <div className="grid p-4">
            <article dangerouslySetInnerHTML={{ __html: page.html }}/>    
        </div>
      </SheetContent>
    </Sheet>
  );
}
