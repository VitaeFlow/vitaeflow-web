import { useCallback, useState } from 'react';
import { extractResume } from '@vitaeflow/sdk';
import type { ExtractResult } from '@vitaeflow/sdk';
import FileDropzone from '../shared/FileDropzone';
import Panel from '../shared/Panel';
import PrivacyNote from '../shared/PrivacyNote';
import JsonViewer from '../shared/JsonViewer';
import DetectionResult from './DetectionResult';
import SectionPills from './SectionPills';

export default function InspectTool() {
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (bytes: Uint8Array) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      setResult(await extractResume(bytes));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to inspect this file');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const isVitaeFlow = result?.resume != null;

  return (
    <div className="space-y-6">
      <PrivacyNote />

      <FileDropzone
        onFile={handleFile}
        label="Drop a PDF here to inspect"
        isLoading={isProcessing}
      />

      {error && (
        <Panel className="border-red-500/20 bg-red-500/5">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </Panel>
      )}

      {result && (
        <>
          <Panel>
            <DetectionResult
              isVitaeFlow={isVitaeFlow}
              resume={result.resume ?? null}
              validation={result.validation ?? null}
            />
          </Panel>

          {result.resume && (
            <>
              <Panel>
                <SectionPills resume={result.resume} />
              </Panel>

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Raw JSON</h4>
                <JsonViewer data={result.resume} maxHeight="32rem" />
              </div>
            </>
          )}

          <button
            onClick={handleReset}
            className="text-sm font-semibold text-teal hover:underline"
          >
            Inspect another file
          </button>
        </>
      )}
    </div>
  );
}
