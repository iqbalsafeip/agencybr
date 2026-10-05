import { useEffect, useRef, useState } from 'react';

export interface UseRealtimeDataOptions<T> {
  interval?: number;
  enabled?: boolean;
  initialData?: T;
}

export function useRealtimeData<T>(fetcher: () => Promise<T>, options: UseRealtimeDataOptions<T> = {}) {
  const { interval = 15000, enabled = true, initialData } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState<boolean>(false);
  const [updatedAt, setUpdatedAt] = useState<number | null>(Date.now());
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        const result = await fetcherRef.current();
        if (cancelled) return;
        setData(result);
        setError(null);
        setStale(false);
        setUpdatedAt(Date.now());
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Request failed');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();
    const timer = window.setInterval(() => {
      run();
    }, interval);

    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') {
        run();
      }
    };

    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', visibilityHandler);
      setStale(Date.now() - (updatedAt ?? Date.now()) > interval * 1.5);
    };
  }, [enabled, interval, updatedAt]);

  return { data, loading, error, stale, updatedAt };
}
