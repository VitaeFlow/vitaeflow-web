import type { CertificationEntry } from '@vitaeflow/sdk';
import FormField from './FormField';
import EntryList from './EntryList';
import { updateAt } from './formUtils';

interface CertificationsFormProps {
  entries: CertificationEntry[];
  onChange: (entries: CertificationEntry[]) => void;
}

const EMPTY_ENTRY: CertificationEntry = { name: '', issuer: '' };

export default function CertificationsForm({ entries, onChange }: CertificationsFormProps) {
  const update = (index: number, patch: Partial<CertificationEntry>) => onChange(updateAt(entries, index, patch));

  return (
    <EntryList
      label="Certifications"
      items={entries}
      onAdd={() => onChange([...entries, { ...EMPTY_ENTRY }])}
      onRemove={(i) => onChange(entries.filter((_, j) => j !== i))}
      addLabel="Add certification"
      renderItem={(entry, i) => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Name" name="name" value={entry.name} onChange={(v) => update(i, { name: v })} required placeholder="AWS Solutions Architect" />
            <FormField label="Issuer" name="issuer" value={entry.issuer} onChange={(v) => update(i, { issuer: v })} required placeholder="Amazon Web Services" />
          </div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <FormField label="Date" name="date" type="month" value={entry.date ?? ''} onChange={(v) => update(i, { date: v || undefined })} />
            <FormField label="Valid until" name="validUntil" type="month" value={entry.validUntil ?? ''} onChange={(v) => update(i, { validUntil: v || undefined })} />
          </div>
          <FormField label="Verification URL" name="url" type="url" value={entry.url ?? ''} onChange={(v) => update(i, { url: v || undefined })} placeholder="https://..." />
        </div>
      )}
    />
  );
}
