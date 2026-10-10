import React from "react";

/* Renders the light markup used in datasets/Copy.ts:
     *word* → <em>, **words** → <strong>, `key` → <kbd>, newline → <br />
   so copy that needs emphasis can still live in data. */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\n)/;

export default function Rich({ text }: { text: string })
{
  return (
    <>
      {text.split(TOKEN).map((part, index) =>
      {
        if (part === "\n") return <br key={index} />;
        if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.length > 1) return <em key={index}>{part.slice(1, -1)}</em>;
        if (part.startsWith("`")) return <kbd key={index}>{part.slice(1, -1)}</kbd>;
        return part;
      })}
    </>
  );
}

/* The same copy with its markup stripped, for counting and aria text. */
export const plain = (text: string) => text.replace(/\*\*|\*|`/g, "").replace(/\n/g, " ");
