import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawFolder = searchParams.get("folder") ?? "";
  const parts = rawFolder.split("/").filter(Boolean);

  const targetDir = path.join(
    process.cwd(),
    "content/docs/home",
    ...parts
  );

  if (!fs.existsSync(targetDir)) {
    return NextResponse.json([]);
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });

  const cards = entries
    .filter((e) => e.isDirectory())
    .map((dir) => {
      const metaPath = path.join(
        targetDir,
        dir.name,
        "meta.json"
      );

      let meta: {
        title?: string;
        description?: string;
        order?: number;
      } = {};

      if (fs.existsSync(metaPath)) {
        try {
          meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
        } catch (err) {
          console.error("Invalid meta.json in", dir.name);
        }
      }

      return {
        slug: dir.name,
        title:
          meta.title ??
          dir.name.replace(/-/g, " "),
        description:
          meta.description ??
          "",
        order: meta.order ?? 0,
      };
    })
    .sort((a, b) => b.order - a.order);

  return NextResponse.json(cards);
}
