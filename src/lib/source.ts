import { InferMetaType, InferPageType, loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { docs, shorts } from "@/.source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
});

// NEW: Shorts source — will NOT appear in your normal sidenav unless you use it there
export const shortsSource = loader({
  baseUrl: "/shorts",
  source: shorts.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;