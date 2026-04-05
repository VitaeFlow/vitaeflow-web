import { useState } from 'react';

interface Example {
  slug: string;
  name: string;
  headline: string;
  json: object;
}

interface Props {
  examples: Example[];
}

function JsonSyntax({ json }: { json: string }) {
  const highlighted = json
    .replace(
      /("(?:\\.|[^"\\])*")(\s*:)/g,
      '<span class="jk">$1</span>$2',
    )
    .replace(
      /:\s*("(?:\\.|[^"\\])*")/g,
      ': <span class="jv">$1</span>',
    )
    .replace(
      /:\s*(\d+)/g,
      ': <span class="jn">$1</span>',
    )
    .replace(
      /[{}[\],]/g,
      (m) => `<span class="jp">${m}</span>`,
    );

  return (
    <pre
      className="text-[0.78rem] leading-[1.7] whitespace-pre"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

export default function ExamplesCarousel({ examples }: Props) {
  const [active, setActive] = useState(0);
  const current = examples[active];
  const jsonStr = JSON.stringify(current.json, null, 2);

  return (
    <div className="mt-12 grid grid-cols-[1fr_1fr] grid-rows-[1fr_auto] gap-x-6 gap-y-5 max-lg:grid-cols-1 max-lg:grid-rows-none">
      {/* Top-left — PDF preview */}
      <div className="overflow-hidden rounded-2xl border border-[rgba(36,55,70,0.1)] bg-white p-3 shadow-[0_24px_80px_rgba(24,51,68,0.12)]">
        <img
          key={current.slug}
          src={`/examples/thumbnails/${current.slug}.webp`}
          alt={`${current.name} — ${current.headline}`}
          className="max-h-[80vh] w-full rounded-xl object-contain animate-[fadeIn_0.3s_ease]"
        />
      </div>

      {/* Top-right — JSON viewer */}
      <div className="relative min-w-0 overflow-hidden">
        <div className="examples-json absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[rgba(36,55,70,0.06)] max-lg:relative max-lg:h-[500px]">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#1a2a38] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-2 text-[0.7rem] font-medium text-white/30">vitaeflow.json</span>
            </div>
            <span className="text-[0.65rem] font-medium tracking-wide text-[#568383]/60 uppercase">
              extracted from .vf.pdf
            </span>
          </div>
          {/* JSON content */}
          <div
            key={current.slug}
            className="flex-1 overflow-auto bg-[#1e2d3d] p-4 animate-[fadeIn_0.3s_ease]"
          >
            <JsonSyntax json={jsonStr} />
          </div>
        </div>
      </div>

      {/* Bottom-left — Thumbnail selector */}
      <div className="flex gap-3 max-lg:justify-center max-lg:overflow-x-auto max-lg:pb-1">
        {examples.map((ex, i) => (
          <button
            key={ex.slug}
            onClick={() => setActive(i)}
            className={`group relative flex flex-col items-center gap-2 rounded-xl border p-2.5 pb-3 transition-all duration-200 ${
              i === active
                ? 'border-[#568383]/30 bg-[#568383]/8 shadow-sm'
                : 'border-[rgba(36,55,70,0.06)] bg-[#fffdf8]/60 hover:border-[#568383]/15 hover:bg-[#568383]/4'
            }`}
          >
            <img
              src={`/examples/thumbnails/${ex.slug}.webp`}
              alt={ex.name}
              className={`h-16 w-12 rounded-md object-cover object-top transition-opacity ${
                i === active ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
              }`}
            />
            <div className="text-center">
              <div className={`text-[0.7rem] font-semibold leading-tight ${
                i === active ? 'text-[#243746]' : 'text-[rgba(36,55,70,0.54)]'
              }`}>
                {ex.name}
              </div>
              <div className={`mt-0.5 text-[0.6rem] leading-tight ${
                i === active ? 'text-[#568383]' : 'text-[rgba(36,55,70,0.35)]'
              }`}>
                {ex.headline}
              </div>
            </div>
            {/* Active indicator */}
            {i === active && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#568383]" />
            )}
          </button>
        ))}
      </div>

      {/* Bottom-right — Download button */}
      <div className="flex items-start max-lg:justify-center">
        <a
          href={`/examples/pdf/${current.slug}.vf.pdf`}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-[#568383] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(86,131,131,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(86,131,131,0.4)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download .vf.pdf
        </a>
      </div>
    </div>
  );
}
