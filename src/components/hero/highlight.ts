/**
 * A deliberately tiny Kotlin highlighter for the decorative hero snippet.
 * Runs at build time (server component), so it adds no client JavaScript.
 */
export type TokenKind = "keyword" | "string" | "type" | "annotation" | "comment" | "plain";
export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set(["data", "class", "val", "var", "fun", "listOf", "return", "object"]);

const pattern = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|(\b[A-Za-z_]\w*\b)|(\s+)|([^\w\s"@/]+|\/)/g;

export function highlightKotlin(source: string): Token[][] {
  return source.split("\n").map((line) => {
    const tokens: Token[] = [];
    for (const match of line.matchAll(pattern)) {
      const [text, comment, str, annotation, word] = match;
      let kind: TokenKind = "plain";
      if (comment) kind = "comment";
      else if (str) kind = "string";
      else if (annotation) kind = "annotation";
      else if (word && KEYWORDS.has(word)) kind = "keyword";
      else if (word && /^[A-Z]/.test(word)) kind = "type";
      tokens.push({ kind, text });
    }
    return tokens;
  });
}
