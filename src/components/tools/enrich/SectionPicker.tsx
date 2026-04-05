import type { SectionKey } from './enrichReducer';

interface SectionPickerProps {
  activeSections: SectionKey[];
  onToggle: (section: SectionKey) => void;
}

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'work', label: 'Work' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'languages', label: 'Languages' },
  { key: 'certifications', label: 'Certifications' },
];

export default function SectionPicker({ activeSections, onToggle }: SectionPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-ink-muted">Sections:</span>
      {SECTIONS.map(({ key, label }) => {
        const active = activeSections.includes(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? 'bg-teal text-white'
                : 'border border-ink/10 bg-white text-ink-soft hover:border-teal hover:text-teal'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
