import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { FolderCards } from "@/components/folder-cards";
import { FolderCardsRoot } from "@/components/folder-cards-root";
import ReadingTime from "@/components/reading-time";
import { CalendarDays, Clock } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDXContent = page.data.body;
  const showCards = page.data?.showFolderCards === true;
  const showCardsRoot = page.data?.showFolderCardsRoot === true;
  const folderSlug =
  showCards 
    ? page.slugs
    : page.slugs.slice(0, -1);
  const folderSlugRoot =
  showCardsRoot
    ? page.slugs
    : page.slugs.slice(0, -1);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "" }}
    >
      <div className="flex flex-col gap-2">
        <DocsTitle className="leading-tight tracking-tight text-pink-500">
          {page.data.title}
        </DocsTitle>

        <DocsDescription className="text-lg text-black-900 max-w-3xl leading-relaxed !mb-0">
          {page.data.description}
        </DocsDescription>

        {/* Stripe-style metadata line */}
        <div className="stripe-meta mt-2 pl-3 border-l-[2.5px] border-pink-400/80 flex items-center gap-2 text-sm text-muted-foreground/90 font-medium">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-muted-foreground/90" /> {new Date(page.data.lastModified).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-muted-foreground/90">
            <Clock className="w-4 h-4" /> <ReadingTime selector="main" />
          </span>
        </div>

        <hr className="my-2" />
      </div>

      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />


        {showCards && <FolderCards folder={folderSlug} />}
        {showCardsRoot && <FolderCardsRoot folder={folderSlugRoot} />}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const page = source.getPage(slug) as {
    data: {
      title: string;
      description?: string;
      [key: string]: any;
    };
    slugs: string[];
  } | null;

  if (!page) {
    return notFound();
  }

  const image = ["/api/og", ...slug, "image.png"].join("/");

  return createMetadata({
    title: page.data.title,
    openGraph: {
      url: `/docs/${page.slugs.join("/")}`,
      images: [image],
    },
    twitter: {
      images: [image],
    },
    ...(page.data.description && {
      description: page.data.description,
    }),
  });
}
