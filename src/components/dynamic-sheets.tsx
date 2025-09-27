"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface DynamicSheetProps {
  trigger: ReactNode;        // Trigger element (button, icon, text)
  title: string;             // Sheet title
  description?: string;      // Optional description
  children?: ReactNode;      // Content inside the sheet
  side?: "left" | "right" | "top" | "bottom"; // Optional sheet position
}

export function DynamicSheet({
  trigger,
  title,
  description,
  children,
  side = "right",
}: DynamicSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
