// components/CodeRunner.tsx
"use client";

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export type CodeRunnerProps = {
  initialCode?: string;
  initialInput?: string;
  title?: string;
};

export const CodeRunner: React.FC<CodeRunnerProps> = ({
  initialCode = `// Write JavaScript here\nconsole.log("Hello from Byte Notes!");`,
  initialInput = "",
  title = "Code Runner (JavaScript)",
}) => {
  const [code, setCode] = useState(initialCode);
  const [input, setInput] = useState(initialInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    setInput(initialInput);
  }, [initialInput]);

  const runCode = () => {
    setRunning(true);
    setError(null);
    setOutput("");

    const logs: string[] = [];
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      const line = args
        .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
        .join(" ");
      logs.push(line);
      originalLog(...args);
    };

    try {
      const wrapped = `
        // You can use the variable "input" (string) in your code.
        ${code}
      `;
      const fn = new Function("input", wrapped);
      fn(input);
    } catch (e: any) {
      setError(String(e));
    } finally {
      console.log = originalLog;
      setRunning(false);
      setOutput(logs.join("\n"));
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">{title}</span>
        <button
          type="button"
          onClick={runCode}
          disabled={running}
          className="rounded border px-2 py-1 text-xs disabled:opacity-60"
        >
          {running ? "Running..." : "Run"}
        </button>
      </div>

      <CodeMirror
        value={code}
        height="400px"
        extensions={[javascript({ jsx: true })]}
        onChange={(val) => setCode(val)}
        theme="dark"
        
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
        }}
      />

      <label className="text-[10px] font-medium">
        Input
        <span className="ml-1 text-[10px] text-gray-500">
          (passed as <code>input</code>)
        </span>
      </label>
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded border px-2 py-1 font-mono text-xs"
      />

      <div>
        <div className="text-[10px] font-medium">Output</div>
        <pre className="max-h-32 overflow-auto rounded border bg-black px-2 py-1 text-[11px] text-green-400">
          {output || (!error && "// console.log output appears here")}
          {error ? `\n[Error] ${error}` : ""}
        </pre>
      </div>
    </div>
  );
};
