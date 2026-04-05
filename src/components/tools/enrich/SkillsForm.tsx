import type { SkillCategory, SkillItem } from '@vitaeflow/sdk';
import FormField from './FormField';

interface SkillsFormProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

const LEVEL_OPTIONS = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Expert', value: 'expert' },
];

export default function SkillsForm({ categories, onChange }: SkillsFormProps) {
  const updateCategory = (index: number, patch: Partial<SkillCategory>) => {
    onChange(categories.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  const addItem = (catIndex: number) => {
    const cat = categories[catIndex];
    updateCategory(catIndex, { items: [...cat.items, { name: '' }] });
  };

  const removeItem = (catIndex: number, itemIndex: number) => {
    const cat = categories[catIndex];
    updateCategory(catIndex, { items: cat.items.filter((_, j) => j !== itemIndex) });
  };

  const updateItem = (catIndex: number, itemIndex: number, patch: Partial<SkillItem>) => {
    const cat = categories[catIndex];
    updateCategory(catIndex, {
      items: cat.items.map((item, j) => (j === itemIndex ? { ...item, ...patch } : item)),
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-bold text-ink">Skill Categories</h4>
        <span className="rounded-full bg-ink/6 px-2 py-0.5 text-xs font-semibold text-ink-muted">{categories.length}</span>
      </div>

      {categories.map((cat, ci) => (
        <div key={ci} className="relative rounded-xl border border-ink/8 bg-ink/2 p-5">
          <button
            onClick={() => onChange(categories.filter((_, j) => j !== ci))}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
            title="Remove category"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <FormField
            label="Category"
            name="category"
            value={cat.category}
            onChange={(v) => updateCategory(ci, { category: v })}
            required
            placeholder="Programming Languages"
            className="mb-4"
          />

          <div className="space-y-2">
            {cat.items.map((item, ii) => (
              <div key={ii} className="flex items-end gap-3">
                <FormField label="Skill" name="name" value={item.name} onChange={(v) => updateItem(ci, ii, { name: v })} placeholder="TypeScript" className="flex-1" />
                <FormField label="Level" name="level" value={item.level ?? ''} onChange={(v) => updateItem(ci, ii, { level: (v || undefined) as SkillItem['level'] })} options={LEVEL_OPTIONS} className="w-40" />
                <button
                  onClick={() => removeItem(ci, ii)}
                  className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-red-500/10 hover:text-red-500"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
            <button onClick={() => addItem(ci)} className="text-sm font-semibold text-teal hover:underline">+ Add skill</button>
          </div>
        </div>
      ))}

      <button
        onClick={() => onChange([...categories, { category: '', items: [{ name: '' }] }])}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/10 px-4 py-3 text-sm font-semibold text-teal transition-colors hover:border-teal hover:bg-teal/4"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add category
      </button>
    </div>
  );
}
