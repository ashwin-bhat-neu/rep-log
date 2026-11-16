import { useEffect, useState } from "react";

const NO_RESULT = { load: null, data: null, error: null };

// Calls load(signal) whenever the load function changes (wrap it in useCallback) and keeps the latest
// result. While a newer request is running, isLoading is true and the previous data stays on screen.
export default function useApiRequest(load) {
  const [result, setResult] = useState(NO_RESULT);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    load(signal).then(
      (data) => {
        if (!signal.aborted) {
          setResult({ load, data, error: null });
        }
      },
      (error) => {
        if (!signal.aborted) {
          setResult({ load, data: null, error });
        }
      },
    );
    return () => abortController.abort();
  }, [load]);

  return {
    data: result.data,
    error: result.error,
    isLoading: result.load !== load,
  };
}
