"use client";
import { useEffect, useState } from "react";

interface ReadingTimeProps {
  selector?: string;
  wpm?: number;
}

export default function ReadingTime({ selector = "main", wpm = 200 }: ReadingTimeProps) {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const text = el.textContent || "";
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wpm);

    setTime(minutes);
  }, [selector, wpm]);

  if (time === null) return null;

  return (
    <span
      className="text-sm font-medium select-none"
      title="Estimated reading time"
    >
      {time} min read
    </span>
  );
}
