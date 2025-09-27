import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import { z } from "zod/v3";

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      showFolderCards: z.boolean().default(false),
      order: z.number().optional()
    }) as any,
  },
  meta: {
    schema: metaSchema.extend({
      // other props
    }),
  },
});

// ✅ NEW: a second, isolated docs collection for `_shorts`
export const shorts = defineDocs({
  dir: "content/shorts", //
  docs: {
    // extend or leave as-is; minimal is fine
    schema: frontmatterSchema.extend({
      // add any per-note fields if you like
      category: z.string().optional()
    }) as any,
  },
  meta: {
    schema: metaSchema.extend({}),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    remarkPlugins: [],
    rehypeCodeOptions: {
      lazy: true,
      experimentalJSEngine: true,
      langs: ["ts", "tsx", "js", "jsx", "json", "md", "mdx", "sh"],
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
      ],
    },
  },
});
