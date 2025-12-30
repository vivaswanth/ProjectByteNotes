"use client";

import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";

import { useState } from "react";
import { ChevronRightIcon, BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
} from "@/components/ui/tabs";
import { CodeRunner } from "./code-runner-client";

interface Page {
  slug: string;
  title: string;
  description?: string;
  html: string;
  category: string;
  jsCode?: string;
  defaultInput?: string;
  javaCode?: string;
  pythonCode?: string;
  cppCode?: string;
}

export function CodeListClient({ pages }: { pages: Page[] }) {
  if (!pages || pages.length === 0) {
    return <p className="text-muted-foreground">No shorts found.</p>;
  }

  return (
    <div>
      {pages.map((page) => (
        <CodeList key={page.slug} page={page} />
      ))}
    </div>
  );
}

function CodeList({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);

  const hasJs = !!page.jsCode;
  const hasJava = !!page.javaCode;
  const hasPy = !!page.pythonCode;
  const hasCpp = !!page.cppCode;

  const firstTab =
    (hasJs && "js") ||
    (hasJava && "java") ||
    (hasPy && "python") ||
    (hasCpp && "cpp") ||
    "js";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>{page.title}</ItemTitle>
          </ItemContent>
          <ItemMedia>
            <Badge className="bg-blue-500 text-white">{page.category}</Badge>
          </ItemMedia>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </Item>
      </SheetTrigger>

      <SheetContent
        side="right"
        style={{ maxWidth: "800px" }}
        className="w-[800px] max-w-none overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{page.title}</SheetTitle>
          <SheetDescription>{page.description}</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 p-4">
          {/* Problem statement */}
          <article dangerouslySetInnerHTML={{ __html: page.html }} />

          {/* Language tabs */}
          {(hasJs || hasJava || hasPy || hasCpp) && (
            <Tabs defaultValue={firstTab}>
              <TabsList className="mb-2">
                {hasJs && (
                  <TabsTrigger value="js">JavaScript (run)</TabsTrigger>
                )}
                {hasJava && <TabsTrigger value="java">Java</TabsTrigger>}
                {hasPy && <TabsTrigger value="python">Python</TabsTrigger>}
                {hasCpp && <TabsTrigger value="cpp">C++</TabsTrigger>}
              </TabsList>

              {hasJs && (
                <TabsContent value="js">
                  <CodeRunner
                    initialCode={page.jsCode!}
                    initialInput={page.defaultInput ?? ""}
                    title="JavaScript playground"
                  />
                </TabsContent>
              )}

              {hasJava && (
                <TabsContent value="java">
                  <StaticCodeBlock
                    code={page.javaCode!}
                    language={java()}
                    label="Java implementation"
                  />
                </TabsContent>
              )}

              {hasPy && (
                <TabsContent value="python">
                  <StaticCodeBlock
                    code={page.pythonCode!}
                    language={python()}
                    label="Python implementation"
                  />
                </TabsContent>
              )}

              {hasCpp && (
                <TabsContent value="cpp">
                  <StaticCodeBlock
                    code={page.cppCode!}
                    language={cpp()}
                    label="C++ implementation"
                  />
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function StaticCodeBlock({
  code,
  language,
  label,
}: {
  code: string;
  language: any;
  label: string;
}) {
  console.log("StaticCodeBlock language:", language);
  return (
    <CodeMirror
      value={code}
      height="300px"
      extensions={[language]}
      onChange={() => {}}
      editable={false}
      theme="dark"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: false,
      }}
    />
  );
}
