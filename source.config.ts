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
      title: z.string(),
      description: z.string().optional(),
      showFolderCards: z.boolean().default(false),
      showFolderCardsRoot: z.boolean().default(false),
      order: z.number().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      title: z.string(),
      description: z.string().optional(),
    }),
  },
});

export const shorts = defineDocs({
  dir: "content/shorts",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      category: z.string().optional(),
      jsCode: z.string().optional(),
      cppCode: z.string().optional(),
      javaCode: z.string().optional(),
      pythonCode: z.string().optional(),
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
