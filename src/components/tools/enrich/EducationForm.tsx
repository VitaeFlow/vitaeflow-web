import type { EducationEntry } from '@vitaeflow/sdk';
import FormField from './FormField';
import EntryList from './EntryList';
import { updateAt } from './formUtils';

interface EducationFormProps {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}

const EMPTY_ENTRY: EducationEntry = { institution: '', startDate: '' };

export default function EducationForm({ entries, onChange }: EducationFormProps) {
  const update = (index: number, patch: Partial<EducationEntry>) => onChange(updateAt(entries, index, patch));

  return (
    <EntryList
      label="Education"
      items={entries}
      onAdd={() => onChange([...entries, { ...EMPTY_ENTRY }])}
      onRemove={(i) => onChange(entries.filter((_, j) => j !== i))}
      addLabel="Add education"
      renderItem={(entry, i) => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Institution" name="institution" value={entry.institution} onChange={(v) => update(i, { institution: v })} required placeholder="INSA Lyon" />
            <FormField label="Field of study" name="area" value={entry.area ?? ''} onChange={(v) => update(i, { area: v || undefined })} placeholder="Computer Science" />
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Start date" name="startDate" type="month" value={entry.startDate} onChange={(v) => update(i, { startDate: v })} required />
            <FormField label="End date" name="endDate" type="month" value={entry.endDate ?? ''} onChange={(v) => update(i, { endDate: v || undefined })} />
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Degree" name="studyType" value={entry.studyType ?? ''} onChange={(v) => update(i, { studyType: v || undefined })} placeholder="Master" />
            <FormField label="Score" name="score" value={entry.score ?? ''} onChange={(v) => update(i, { score: v || undefined })} placeholder="Mention Bien" />
          </div>
        </div>
      )}
    />
  );
}
