type Step = 'upload' | 'edit' | 'download';

interface StepIndicatorProps {
  currentStep: Step;
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'upload', label: 'Upload' },
  { key: 'edit', label: 'Edit' },
  { key: 'download', label: 'Download' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-8 flex items-center gap-2">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.key} className="contents">
            {i > 0 && <div className="h-px w-8 bg-ink/10" />}
            <div className={`flex items-center gap-2 text-sm font-semibold ${
              isDone ? 'text-teal-dark' : isActive ? 'text-teal' : 'text-ink-muted'
            }`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                isDone
                  ? 'bg-teal/12 text-teal-dark'
                  : isActive
                    ? 'bg-teal/12 text-teal'
                    : 'bg-ink/6 text-ink-muted'
              }`}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
