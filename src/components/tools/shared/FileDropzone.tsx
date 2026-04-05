import { useCallback, useRef, useState } from 'react';
import useFileReader from './useFileReader';

interface FileDropzoneProps {
  onFile: (bytes: Uint8Array, name: string) => void;
  accept?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function FileDropzone({
  onFile,
  accept = '.pdf',
  label = 'Drop a PDF here',
  description = 'or click to browse',
  disabled = false,
  isLoading = false,
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { readFile, isReading } = useFileReader();

  const loading = isLoading || isReading;

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    try {
      const bytes = await readFile(file);
      onFile(bytes, file.name);
    } catch {
      setFileName(null);
    }
  }, [readFile, onFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || loading) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [disabled, loading, handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const borderClass = fileName
    ? 'border-teal-dark border-solid bg-teal/4'
    : isDragOver
      ? 'border-teal border-solid bg-teal/6'
      : 'border-ink/15 border-dashed hover:border-teal hover:bg-teal/4';

  return (
    <div
      className={`relative flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 px-8 py-14 text-center transition-colors ${borderClass} ${disabled || loading ? 'pointer-events-none opacity-50' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      {loading ? (
        <svg className="h-10 w-10 animate-spin text-teal" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-10 w-10 text-teal opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
      )}

      {fileName ? (
        <p className="font-mono text-sm font-semibold text-ink">{fileName}</p>
      ) : (
        <>
          <p className="text-ink-soft">
            <span className="font-semibold text-teal">{label}</span>
          </p>
          <p className="text-sm text-ink-muted">{description}</p>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
