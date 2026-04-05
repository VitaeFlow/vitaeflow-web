import { useCallback, useMemo, useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineCount = useMemo(() => value.split('\n').length, [value]);

  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1).join('\n'),
    [lineCount],
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }, []);

  return (
    <div className="flex overflow-hidden rounded-xl bg-[#1e2d3d] font-mono text-[0.82rem] leading-relaxed">
      <div
        ref={gutterRef}
        className="shrink-0 overflow-hidden border-r border-white/6 px-3 py-4 text-right whitespace-pre text-white/20 select-none"
        aria-hidden="true"
      >
        {lineNumbers}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        className="min-h-[28rem] flex-1 resize-none overflow-auto bg-transparent p-4 text-[#e8dcc8] outline-none placeholder:text-white/25"
        spellCheck={false}
        style={{ tabSize: 2 }}
      />
    </div>
  );
}
