"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DynamicSheet } from "./dynamic-sheets";

interface ShortNote {
  slug: string;
  title: string;
  description?: string;
  content: string; // HTML or MDX-rendered content
}

export function FolderCardsWithSheets({ notes }: { notes: ShortNote[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {notes.map((note) => (
        <DynamicSheet
          key={note.slug}
          title={note.title}
          description={note.description}
          trigger={
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent className="p-4 text-center font-medium">
                {note.title}
              </CardContent>
            </Card>
          }
        >
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </DynamicSheet>
      ))}
    </div>
  );
}
