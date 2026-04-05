import type { WorkEntry } from '@vitaeflow/sdk';
import FormField from './FormField';
import EntryList from './EntryList';
import { updateAt } from './formUtils';

interface WorkFormProps {
  entries: WorkEntry[];
  onChange: (entries: WorkEntry[]) => void;
}

const EMPTY_ENTRY: WorkEntry = { organization: '', position: '', startDate: '' };

const TYPE_OPTIONS = [
  { label: 'Employment', value: 'employment' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
];

const REMOTE_OPTIONS = [
  { label: 'On-site', value: 'onsite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
];

export default function WorkForm({ entries, onChange }: WorkFormProps) {
  const update = (index: number, patch: Partial<WorkEntry>) => onChange(updateAt(entries, index, patch));

  return (
    <EntryList
      label="Work Experience"
      items={entries}
      onAdd={() => onChange([...entries, { ...EMPTY_ENTRY }])}
      onRemove={(i) => onChange(entries.filter((_, j) => j !== i))}
      addLabel="Add position"
      renderItem={(entry, i) => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Organization" name="organization" value={entry.organization} onChange={(v) => update(i, { organization: v })} required placeholder="TechCorp" />
            <FormField label="Position" name="position" value={entry.position} onChange={(v) => update(i, { position: v })} required placeholder="Senior Developer" />
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Start date" name="startDate" type="month" value={entry.startDate} onChange={(v) => update(i, { startDate: v })} required />
            <FormField label="End date" name="endDate" type="month" value={entry.endDate ?? ''} onChange={(v) => update(i, { endDate: v || undefined })} />
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Type" name="type" value={entry.type ?? ''} onChange={(v) => update(i, { type: (v || undefined) as WorkEntry['type'] })} options={TYPE_OPTIONS} />
            <FormField label="Remote" name="remote" value={entry.remote ?? ''} onChange={(v) => update(i, { remote: (v || undefined) as WorkEntry['remote'] })} options={REMOTE_OPTIONS} />
          </div>
          <FormField label="Summary" name="summary" value={entry.summary ?? ''} onChange={(v) => update(i, { summary: v || undefined })} rows={2} placeholder="Describe your role..." />
        </div>
      )}
    />
  );
}
