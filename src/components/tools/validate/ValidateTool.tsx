import { useEffect, useRef, useState } from 'react';
import { validateResume } from '@vitaeflow/sdk';
import type { ValidationMode, ValidationResult } from '@vitaeflow/sdk';
import { sampleResume } from '../../../data/sampleResume';
import Panel from '../shared/Panel';
import PrivacyNote from '../shared/PrivacyNote';
import CodeEditor from './CodeEditor';
import ValidationResults from './ValidationResults';

const SAMPLE_JSON = JSON.stringify(sampleResume, null, 2);
const DEBOUNCE_MS = 300;
const MAX_INPUT_LENGTH = 500_000;

export default function ValidateTool() {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [mode, setMode] = useState<ValidationMode>('strict');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (jsonText.length > MAX_INPUT_LENGTH) {
        setResult(null);
        setParseError('Input too large (max 500 KB)');
        return;
      }

      try {
        const data = JSON.parse(jsonText);
        setParseError(null);
        setResult(validateResume(data, { mode }));
      } catch (err) {
        setResult(null);
        setParseError(err instanceof Error ? err.message : 'Invalid JSON');
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [jsonText, mode]);

  return (
    <div className="space-y-6">
      <PrivacyNote />

      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink-muted">Mode:</span>
          {(['strict', 'tolerant'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                mode === m
                  ? 'bg-teal text-white'
                  : 'bg-ink/5 text-ink-soft hover:bg-ink/10'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          {mode === 'strict'
            ? 'Rejects unknown fields. Use this to check full compliance with the VitaeFlow spec.'
            : 'Ignores unknown fields and warns on version mismatch. Use this to check forward-compatible resumes.'}
        </p>
      </div>

      <div className="grid grid-cols-2 items-start gap-6 max-lg:grid-cols-1">
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Editor</h3>
          <CodeEditor value={jsonText} onChange={setJsonText} />
        </div>
        <div className="sticky top-6 self-start">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Results</h3>
          <Panel>
            <ValidationResults result={result} parseError={parseError} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
