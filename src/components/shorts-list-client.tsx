"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";

interface Page {
  slug: string;
  title: string;
  description?: string;
  html: string;
  category: string;
}

export function ShortsListClient({ pages }: { pages: Page[] }) {
  if (!pages || pages.length === 0) {
    return <p className="text-muted-foreground">No shorts found.</p>;
  }

  return (
    <div>
      {pages.map((page) => (
        <ShortList key={page.slug} page={page} />
      ))}
    </div>
  );
}

function ShortList({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Item variant="outline">
          <ItemContent>
              <ItemTitle>{page.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
              <ChevronRightIcon className="size-4" />
          </ItemActions>
        </Item>
      </SheetTrigger>

      <SheetContent side="right" style={{ maxWidth: "800px" }} className="w-[600px] max-w-none overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{page.title}</SheetTitle>
          <SheetDescription>{page.description}</SheetDescription>
        </SheetHeader>
        <div className="grid p-4">
            <article dangerouslySetInnerHTML={{ __html: page.html }}/>    
        </div>
      </SheetContent>
    </Sheet>
  );
}
