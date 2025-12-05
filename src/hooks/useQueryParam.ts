import { useMemo } from 'react';

export const useQueryParam = (key: string): string | null => {
  const search = window.location.search;
  return useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(key);
  }, [search, key]);
};
