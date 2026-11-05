import { profile } from "@/data/profile";
import { highlightKotlin, type TokenKind } from "./highlight";

const focus = ["Android", "Architecture", "Web"];
const firstName = profile.name.split(" ")[0];

const snippet = `data class Engineer(
    val name: String = "${profile.name}",
    val focus: List<String> = listOf(
        ${focus.map((f) => `"${f}"`).join(", ")},
    ),
)

@Composable
fun Introduction(engineer: Engineer) {
    // Code that turns into an experience
    Greeting(engineer.name)
    FocusRow(engineer.focus)
}`;

const tokenColor: Record<TokenKind, string> = {
  keyword: "text-code-keyword",
  string: "text-code-string",
  type: "text-code-type",
  annotation: "text-code-annotation",
  comment: "text-code-comment italic",
  plain: "text-fg-muted",
};

const lines = highlightKotlin(snippet);

/**
 * Decorative hero visual: a Kotlin/Compose editor window and the device preview it
 * "renders", which is the code-to-interface idea the portfolio is about.
 * Purely presentational, so it's hidden from assistive tech.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none lg:mx-0">
      {/* soft accent bloom behind the window */}
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-[radial-gradient(closest-side,rgb(91_140_255/0.16),transparent)] blur-2xl" />

      {/* editor window */}
      <div className="overflow-hidden rounded-panel border border-line-strong bg-surface-1/90 shadow-raised backdrop-blur">
        <div className="flex items-center gap-4 border-b border-line bg-surface-2/60 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-surface-4" />
            <span className="size-2.5 rounded-full bg-surface-4" />
            <span className="size-2.5 rounded-full bg-surface-4" />
          </div>
          <div className="flex gap-1 font-mono text-[0.6875rem]">
            <span className="rounded-md border border-line bg-surface-3 px-2.5 py-1 text-fg">Introduction.kt</span>
            <span className="hidden px-2.5 py-1 text-fg-subtle sm:inline">Theme.kt</span>
          </div>
        </div>
        <pre className="overflow-hidden px-4 py-5 font-mono text-[0.6875rem] leading-[1.75] sm:px-5 sm:text-[0.78rem]">
          <code>
            {lines.map((tokens, i) => (
              <span key={i} className="flex">
                <span className="w-7 shrink-0 pr-3 text-right text-fg-subtle/50 tabular-nums">{i + 1}</span>
                <span className="whitespace-pre">
                  {tokens.map((t, j) => (
                    <span key={j} className={tokenColor[t.kind]}>
                      {t.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      {/* device preview — overlaps the editor on larger screens */}
      <div className="absolute -bottom-10 -right-2 hidden w-44 rotate-[2deg] sm:block lg:-right-8 xl:-right-12">
        <div className="rounded-[1.75rem] border border-line-strong bg-surface-2 p-1.5 shadow-raised">
          <div className="overflow-hidden rounded-[1.4rem] border border-line bg-bg">
            <div className="flex justify-center pt-2">
              <span className="h-1.5 w-12 rounded-full bg-surface-3" />
            </div>
            <div className="flex flex-col gap-3 px-3.5 pb-4 pt-4">
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent-strong">
                Preview
              </span>
              <span className="text-[0.8125rem] font-semibold leading-snug text-fg">
                Hi, I&apos;m {firstName}.
              </span>
              <span className="text-[0.625rem] leading-relaxed text-fg-muted">
                I build Android apps and web platforms.
              </span>
              <span className="flex flex-wrap gap-1">
                {focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line-accent bg-accent-soft px-1.5 py-0.5 text-[0.5rem] text-accent-strong"
                  >
                    {f}
                  </span>
                ))}
              </span>
              <span className="mt-1 h-6 rounded-lg bg-accent/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
