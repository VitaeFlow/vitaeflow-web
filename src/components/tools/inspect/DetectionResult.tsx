import type { Resume, ValidationResult } from '@vitaeflow/sdk';
import StatusBadge from '../shared/StatusBadge';

interface DetectionResultProps {
  isVitaeFlow: boolean;
  resume: Resume | null;
  validation: ValidationResult | null;
}

function MetaItem({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div className="rounded-xl bg-ink/3 px-4 py-3">
      <dt className="text-[0.72rem] font-bold uppercase tracking-wider text-ink-muted">{label}</dt>
      <dd className="mt-1 truncate text-[0.95rem] font-semibold text-ink" title={value}>{value}</dd>
    </div>
  );
}

export default function DetectionResult({ isVitaeFlow, resume, validation }: DetectionResultProps) {
  return (
    <div className="space-y-6">
      {/* Detection banner */}
      <div
        className={`flex items-center gap-4 rounded-2xl px-6 py-5 ${
          isVitaeFlow
            ? 'border border-teal/15 bg-teal/6'
            : 'border border-red-500/12 bg-red-500/5'
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isVitaeFlow ? 'bg-teal/12 text-teal-dark' : 'bg-red-500/10 text-red-600'
          }`}
        >
          {isVitaeFlow ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-ink">
            {isVitaeFlow ? 'VitaeFlow data detected' : 'No VitaeFlow data found'}
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">
            {isVitaeFlow
              ? 'This PDF contains embedded structured resume data.'
              : 'This PDF does not contain any VitaeFlow metadata.'}
          </p>
        </div>
      </div>

      {/* Resume metadata */}
      {resume && (
        <>
          {validation && (
            <div className="flex items-center gap-3">
              <StatusBadge variant={validation.valid ? 'success' : validation.errors.length ? 'error' : 'warning'}>
                {validation.valid
                  ? 'Valid'
                  : `${validation.errors.length} error${validation.errors.length > 1 ? 's' : ''}`}
              </StatusBadge>
              {validation.warnings.length > 0 && (
                <StatusBadge variant="warning">
                  {validation.warnings.length} warning{validation.warnings.length > 1 ? 's' : ''}
                </StatusBadge>
              )}
            </div>
          )}

          <dl className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
            <MetaItem label="Version" value={resume.version} />
            <MetaItem label="Language" value={resume.lang} />
            <MetaItem label="Name" value={`${resume.basics.givenName} ${resume.basics.familyName}`} />
            <MetaItem label="Headline" value={resume.basics.headline} />
            <MetaItem label="Email" value={resume.basics.email} />
            <MetaItem label="Generator" value={resume.meta?.generator} />
            <MetaItem label="Created" value={resume.meta?.createdAt} />
          </dl>
        </>
      )}
    </div>
  );
}
