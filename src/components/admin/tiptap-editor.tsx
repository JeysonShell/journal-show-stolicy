"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

const btn =
  "rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40";

export function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({
        placeholder: "Начните писать статью...",
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] rounded-b-lg border border-t-0 border-border bg-background p-6 outline-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL изображения:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-t-lg border border-border bg-muted/30 p-2">
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()}>
          <strong>B</strong>
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          H
        </button>
        <span className="mx-1 w-px bg-border" />
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <span className="mx-1 w-px bg-border" />
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Список
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. Список
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          «Цитата»
        </button>
        <span className="mx-1 w-px bg-border" />
        <button type="button" className={btn} onClick={addLink}>
          🔗 Ссылка
        </button>
        <button type="button" className={btn} onClick={addImage}>
          🖼 Картинка
        </button>
        <span className="mx-1 w-px bg-border" />
        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          ←
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          ↔
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          →
        </button>
        <span className="mx-1 w-px bg-border" />
        <button type="button" className={btn} onClick={() => editor.chain().focus().undo().run()}>
          ↩
        </button>
        <button type="button" className={btn} onClick={() => editor.chain().focus().redo().run()}>
          ↪
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
