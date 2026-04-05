import { useMemo, useState } from 'react';

interface JsonViewerProps {
  data: unknown;
  className?: string;
  maxHeight?: string;
  copyable?: boolean;
}

type Token = { type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punctuation'; value: string };

const TOKEN_COLORS: Record<Token['type'], string> = {
  key: '#7a98a6',
  string: '#d4e0e5',
  number: '#87b7b7',
  boolean: '#87b7b7',
  null: '#87b7b7',
  punctuation: '#556b78',
};

function tokenize(json: string): Token[] {
  const tokens: Token[] = [];
  const regex = /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|(true|false)|(null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}\[\]:,])/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = regex.exec(json)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'punctuation', value: json.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      tokens.push({ type: 'key', value: match[1] });
      tokens.push({ type: 'punctuation', value: ':' });
      // skip the colon in the regex match
      regex.lastIndex = match.index + match[0].length;
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'string', value: match[2] });
    } else if (match[3] !== undefined) {
      tokens.push({ type: 'boolean', value: match[3] });
    } else if (match[4] !== undefined) {
      tokens.push({ type: 'null', value: match[4] });
    } else if (match[5] !== undefined) {
      tokens.push({ type: 'number', value: match[5] });
    } else if (match[6] !== undefined) {
      tokens.push({ type: 'punctuation', value: match[6] });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < json.length) {
    tokens.push({ type: 'punctuation', value: json.slice(lastIndex) });
  }

  return tokens;
}

export default function JsonViewer({
  data,
  className = '',
  maxHeight = '24rem',
  copyable = true,
}: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const rendered = useMemo(() => {
    return tokenize(json).map((token, i) => (
      <span key={i} style={{ color: TOKEN_COLORS[token.type] }}>
        {token.value}
      </span>
    ));
  }, [json]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-white/50 transition-colors hover:bg-white/14 hover:text-white/80"
          title="Copy JSON"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      )}
      <pre
        className="overflow-auto bg-[#1e2d3d] p-5 font-mono text-[0.8rem] leading-relaxed"
        style={{ maxHeight }}
      >
        <code>{rendered}</code>
      </pre>
    </div>
  );
}
