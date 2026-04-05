import type { LanguageEntry } from '@vitaeflow/sdk';
import FormField from './FormField';
import EntryList from './EntryList';
import { updateAt } from './formUtils';

interface LanguagesFormProps {
  entries: LanguageEntry[];
  onChange: (entries: LanguageEntry[]) => void;
}

const FLUENCY_OPTIONS = [
  { label: 'A1 — Beginner', value: 'A1' },
  { label: 'A2 — Elementary', value: 'A2' },
  { label: 'B1 — Intermediate', value: 'B1' },
  { label: 'B2 — Upper Intermediate', value: 'B2' },
  { label: 'C1 — Advanced', value: 'C1' },
  { label: 'C2 — Proficient', value: 'C2' },
  { label: 'Native', value: 'native' },
  { label: 'Bilingual', value: 'bilingual' },
];

const EMPTY_ENTRY: LanguageEntry = { language: '', fluency: 'B2' };

export default function LanguagesForm({ entries, onChange }: LanguagesFormProps) {
  const update = (index: number, patch: Partial<LanguageEntry>) => onChange(updateAt(entries, index, patch));

  return (
    <EntryList
      label="Languages"
      items={entries}
      onAdd={() => onChange([...entries, { ...EMPTY_ENTRY }])}
      onRemove={(i) => onChange(entries.filter((_, j) => j !== i))}
      addLabel="Add language"
      renderItem={(entry, i) => (
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          <FormField label="Language" name="language" value={entry.language} onChange={(v) => update(i, { language: v })} required placeholder="French" />
          <FormField label="Fluency" name="fluency" value={entry.fluency} onChange={(v) => update(i, { fluency: v as LanguageEntry['fluency'] })} options={FLUENCY_OPTIONS} />
          <FormField label="Code" name="code" value={entry.code ?? ''} onChange={(v) => update(i, { code: v || undefined })} placeholder="fr" />
        </div>
      )}
    />
  );
}
