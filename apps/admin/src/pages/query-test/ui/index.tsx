'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/components/ui/button';

// This function will always throw an error
const fetchWithError = async () => {
  throw new Error('Test error message');
};

export function QueryTest() {
  const { refetch } = useQuery({
    queryKey: ['test-error'],
    queryFn: fetchWithError,
    enabled: false, // Don't run automatically
  });

  return (
    <div className="p-4">
      <Button onClick={() => refetch()}>Test Query Error Toast</Button>
    </div>
  );
}

export default QueryTest;
