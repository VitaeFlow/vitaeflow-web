import type { Resume } from '@vitaeflow/sdk';

interface SectionPillsProps {
  resume: Resume;
}

const ALL_SECTIONS = [
  'work', 'education', 'skills', 'languages', 'certifications',
  'projects', 'publications', 'volunteer', 'references', 'interests',
] as const;

export default function SectionPills({ resume }: SectionPillsProps) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Sections</h4>
      <div className="flex flex-wrap gap-2">
        {ALL_SECTIONS.map((section) => {
          const data = resume[section as keyof Resume];
          const present = Array.isArray(data) && data.length > 0;

          return (
            <span
              key={section}
              className={`rounded-full px-3 py-1 text-[0.78rem] font-semibold ${
                present
                  ? 'bg-teal/10 text-teal-dark'
                  : 'bg-ink/4 text-ink-muted line-through'
              }`}
            >
              {section}
            </span>
          );
        })}
      </div>
    </div>
  );
}
