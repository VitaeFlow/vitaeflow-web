export default function PrivacyNote() {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-muted">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      All processing happens in your browser. Your file never leaves your device.
    </div>
  );
}
