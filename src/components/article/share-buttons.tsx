"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { title: string; url: string };

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Поделиться:</span>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm">
          <Send className="mr-2 h-4 w-4" />
          Telegram
        </Button>
      </a>
      <Button variant="outline" size="sm" onClick={copy}>
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Скопировано
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" /> Ссылка
          </>
        )}
      </Button>
    </div>
  );
}
