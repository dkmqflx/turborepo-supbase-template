'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/button';

import { apiClientInstance } from '@/shared/lib/apiClient';

// This function will always throw an error
const fetchWithError = async () => {
  const { data } = await apiClientInstance.get('/posts/error');

  return data;
};

export function QueryTest() {
  const { refetch } = useQuery({
    queryKey: ['test-error'],
    queryFn: fetchWithError,
    enabled: false, // Don't run automatically
    retry: false,
  });

  return (
    <div className="p-4">
      <Button onClick={() => refetch()}>Test Query Error Toast</Button>
    </div>
  );
}

export default QueryTest;
