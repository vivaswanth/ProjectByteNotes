import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import {
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
    }) as any,
  },
  meta: {
    schema: metaSchema.extend({
      // other props
    }),
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
