import type { ValidationResult } from '@vitaeflow/sdk';
import StatusBadge from '../shared/StatusBadge';

interface ValidationResultsProps {
  result: ValidationResult | null;
  parseError: string | null;
}

export default function ValidationResults({ result, parseError }: ValidationResultsProps) {
  if (parseError) {
    return (
      <div className="space-y-4">
        <StatusBadge variant="error">Parse error</StatusBadge>
        <div className="rounded-xl border border-red-500/12 bg-red-500/5 px-4 py-3">
          <p className="font-mono text-sm text-red-600">{parseError}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center text-ink-muted">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <p className="text-sm">Paste or edit JSON to validate</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Status */}
      <StatusBadge variant={result.valid ? 'success' : 'error'}>
        {result.valid
          ? 'Valid'
          : `${result.errors.length} error${result.errors.length > 1 ? 's' : ''} found`}
      </StatusBadge>

      {/* Errors */}
      {result.errors.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Errors</h4>
          <ul className="space-y-2">
            {result.errors.map((err, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-red-500/12 bg-red-500/5 px-4 py-3 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-500">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>
                  <code className="rounded bg-teal/8 px-1.5 py-0.5 font-mono text-xs text-teal">{err.path}</code>
                  <p className="mt-1 text-ink">{err.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Warnings</h4>
          <ul className="space-y-2">
            {result.warnings.map((warn, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-amber-500/12 bg-amber-500/5 px-4 py-3 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-500">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-ink">{warn}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
