import { useCallback, useMemo, useReducer, useRef } from 'react';
import { embedResume, extractResume, validateResume } from '@vitaeflow/sdk';
import FileDropzone from '../shared/FileDropzone';
import Panel from '../shared/Panel';
import PrivacyNote from '../shared/PrivacyNote';
import StatusBadge from '../shared/StatusBadge';
import JsonViewer from '../shared/JsonViewer';
import { enrichReducer, initialState, assembleResume } from './enrichReducer';
import type { SectionKey } from './enrichReducer';
import StepIndicator from './StepIndicator';
import SectionPicker from './SectionPicker';
import BasicsForm from './BasicsForm';
import WorkForm from './WorkForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import CertificationsForm from './CertificationsForm';

export default function EnrichTool() {
  const [state, dispatch] = useReducer(enrichReducer, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const handleFile = useCallback(async (bytes: Uint8Array, fileName: string) => {
    dispatch({ type: 'SET_PDF', bytes, fileName });

    // Try to prefill if the PDF already contains VitaeFlow data
    try {
      const result = await extractResume(bytes, { mode: 'tolerant' });
      if (result?.resume) {
        dispatch({ type: 'PREFILL', resume: result.resume });
      }
    } catch {
      // Not a VitaeFlow PDF — that's fine
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    const s = stateRef.current;
    if (!s.pdfBytes) return;

    dispatch({ type: 'SET_PROCESSING', value: true });

    try {
      const resume = assembleResume(s);
      const result = validateResume(resume, { mode: 'strict' });

      if (!result.valid) {
        dispatch({ type: 'SET_VALIDATION', validation: result });
        dispatch({ type: 'SET_ERROR', error: 'Please fix the validation errors below.' });
        return;
      }

      const enrichedPdf = await embedResume(s.pdfBytes, resume);
      dispatch({ type: 'SET_RESULT', bytes: enrichedPdf });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: err instanceof Error ? err.message : 'Failed to generate PDF' });
    }
  }, []);

  const handleDownload = useCallback(() => {
    const s = stateRef.current;
    if (!s.resultBytes) return;
    const blob = new Blob([s.resultBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = s.pdfFileName.replace(/\.pdf$/i, '') + '.vf.pdf';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, []);

  const assembledPreview = useMemo(
    () => state.step === 'download' ? assembleResume(state) : null,
    [state.step, state.basics, state.work, state.education, state.skills, state.languages, state.certifications, state.activeSections],
  );

  return (
    <div className="space-y-6">
      <PrivacyNote />

      <StepIndicator currentStep={state.step} />

      {state.step === 'upload' && (
        <FileDropzone
          onFile={handleFile}
          label="Drop your resume PDF here"
          description="or click to browse — we'll add structured data to it"
        />
      )}

      {state.step === 'edit' && (
        <div className="space-y-6">
          <Panel>
            <BasicsForm basics={state.basics} onChange={(basics) => dispatch({ type: 'SET_BASICS', basics })} />
          </Panel>

          <SectionPicker
            activeSections={state.activeSections}
            onToggle={(section: SectionKey) => dispatch({ type: 'TOGGLE_SECTION', section })}
          />

          {state.activeSections.includes('work') && (
            <Panel>
              <WorkForm entries={state.work} onChange={(work) => dispatch({ type: 'SET_WORK', work })} />
            </Panel>
          )}

          {state.activeSections.includes('education') && (
            <Panel>
              <EducationForm entries={state.education} onChange={(education) => dispatch({ type: 'SET_EDUCATION', education })} />
            </Panel>
          )}

          {state.activeSections.includes('skills') && (
            <Panel>
              <SkillsForm categories={state.skills} onChange={(skills) => dispatch({ type: 'SET_SKILLS', skills })} />
            </Panel>
          )}

          {state.activeSections.includes('languages') && (
            <Panel>
              <LanguagesForm entries={state.languages} onChange={(languages) => dispatch({ type: 'SET_LANGUAGES', languages })} />
            </Panel>
          )}

          {state.activeSections.includes('certifications') && (
            <Panel>
              <CertificationsForm entries={state.certifications} onChange={(certifications) => dispatch({ type: 'SET_CERTIFICATIONS', certifications })} />
            </Panel>
          )}

          {state.validation && !state.validation.valid && (
            <Panel className="border-red-500/20 bg-red-500/5">
              <div className="space-y-3">
                <StatusBadge variant="error">
                  {state.validation.errors.length} error{state.validation.errors.length > 1 ? 's' : ''}
                </StatusBadge>
                <ul className="space-y-1.5">
                  {state.validation.errors.map((err, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <code className="shrink-0 rounded bg-teal/8 px-1.5 py-0.5 font-mono text-xs text-teal">{err.path}</code>
                      <span className="text-ink">{err.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          )}

          {state.error && (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={handleGenerate}
              disabled={state.isProcessing}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-bold text-white shadow-[0_12px_28px_rgba(86,131,131,0.25)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {state.isProcessing ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate .vf.pdf'
              )}
            </button>
            <button onClick={() => dispatch({ type: 'RESET' })} className="text-sm font-semibold text-ink-muted hover:text-ink">
              Start over
            </button>
          </div>
        </div>
      )}

      {state.step === 'download' && (
        <Panel className="text-center">
          <div className="flex flex-col items-center gap-5 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-ink">Your enriched PDF is ready</h3>
            <p className="max-w-md text-ink-soft">
              The file <code className="rounded bg-teal/8 px-1.5 py-0.5 text-sm font-semibold text-teal">{state.pdfFileName.replace(/\.pdf$/i, '')}.vf.pdf</code> contains your structured resume data.
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-bold text-white shadow-[0_12px_28px_rgba(86,131,131,0.25)] transition-all hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download .vf.pdf
            </button>
          </div>

          {assembledPreview && (
            <div className="mt-6 text-left">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Embedded JSON</h4>
              <JsonViewer data={assembledPreview} maxHeight="24rem" />
            </div>
          )}

          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="mt-6 text-sm font-semibold text-teal hover:underline"
          >
            Enrich another PDF
          </button>
        </Panel>
      )}
    </div>
  );
}
