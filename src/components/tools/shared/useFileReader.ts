import { useCallback, useEffect, useRef, useState } from 'react';

export default function useFileReader() {
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const readerRef = useRef<FileReader | null>(null);
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
      readerRef.current?.abort();
    };
  }, []);

  const readFile = useCallback((file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      readerRef.current?.abort();
      setIsReading(true);
      setError(null);

      const reader = new FileReader();
      readerRef.current = reader;

      reader.onload = () => {
        if (unmountedRef.current) return;
        setIsReading(false);
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      };

      reader.onerror = () => {
        if (unmountedRef.current) return;
        const msg = 'Failed to read file';
        setIsReading(false);
        setError(msg);
        reject(new Error(msg));
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  return { readFile, isReading, error };
}
