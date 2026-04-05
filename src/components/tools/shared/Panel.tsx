import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export default function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={`rounded-2xl border border-ink/6 bg-white-soft/80 p-8 ${className}`}>
      {children}
    </div>
  );
}
