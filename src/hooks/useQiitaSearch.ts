import { useCallback, useEffect, useState } from 'react';
import { fetchQiitaItems, type QiitaItem } from '../services/qiita';

export const useQiitaSearch = (initialQuery?: string | null) => {
  const [items, setItems] = useState<QiitaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const results = await fetchQiitaItems(query);
      setItems(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      search(initialQuery);
    }
  }, [initialQuery, search]);

  return { items, loading, error, search };
};
