'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/button';

import { client } from '@/shared/lib/apiClient';

// This function will always throw an error
const fetchWithError = async () => {
  const { data } = await client.get('/api/error');

  return data;
};

export function QueryTest() {
  const { refetch } = useQuery({
    queryKey: ['server-error'],
    queryFn: fetchWithError,
    enabled: false, // Don't run automatically
    retry: false,
    throwOnError: true,
  });

  return (
    <div className="p-4">
      <Button onClick={() => refetch()}>Test Server Error Boundary</Button>
    </div>
  );
}

export default QueryTest;
