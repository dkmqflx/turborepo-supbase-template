'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/sonner';
import { ApiError } from '@repo/utils/apiError';

import { client } from '@/shared/lib/apiClient';

// This function will always throw an error
const fetchWithError = async () => {
  const { data } = await client.get('/api/error');

  return data;
};

const fetchWithErrorMutation = async () => {
  const { data } = await client.post('/api/error');

  return data;
};

export function QueryTest() {
  const { refetch } = useQuery({
    queryKey: ['test-error'],
    queryFn: fetchWithError,
    enabled: false, // Don't run automatically
    retry: false,
    meta: {
      toast: false,
      message: 'Test Query Error Toast',
    },
  });

  const { mutate: mutateWithError } = useMutation({
    mutationFn: fetchWithErrorMutation,
    onError: (error) => {
      console.log(error);

      // NOTE: you can handle error depend on your error code type
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="p-4">
      <Button onClick={() => refetch()}>Test Query Error Toast</Button>
      <Button onClick={() => mutateWithError()}>Test Mutation Error Toast</Button>
    </div>
  );
}

export default QueryTest;
