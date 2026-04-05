import type { ReactNode } from 'react';

interface EntryListProps<T> {
  label: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
}

export default function EntryList<T>({
  label,
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = 'Add entry',
}: EntryListProps<T>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-bold text-ink">{label}</h4>
        <span className="rounded-full bg-ink/6 px-2 py-0.5 text-xs font-semibold text-ink-muted">
          {items.length}
        </span>
      </div>

      {items.map((item, i) => (
        <div key={i} className="relative rounded-xl border border-ink/8 bg-ink/2 p-5">
          <button
            onClick={() => onRemove(i)}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
            title="Remove"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {renderItem(item, i)}
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/10 px-4 py-3 text-sm font-semibold text-teal transition-colors hover:border-teal hover:bg-teal/4"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
}
