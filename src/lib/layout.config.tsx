import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { CircleOff } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <CircleOff className="size-6" />
        <span className="text-lg font-semibold">The Byte Notes</span>
      </>
    ),
  },
  githubUrl: GITHUB_URL,
  links: [
    {
      text: "Articles",
      url: "/docs/cs-101",
      active: "nested-url",
    },
  ],
};
