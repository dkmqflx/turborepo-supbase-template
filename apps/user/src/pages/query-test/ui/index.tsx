'use client';

import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/sonner';
import { ApiError } from '@repo/utils/apiError';

import { client } from '@/shared/lib/apiClient';

const unusedVar = 123;

// 미사용 함수
function unusedFunction() {
  return 'I am not used';
}

// 콘솔 사용 (no-console 규칙이 error일 경우)
console.log('This is a console log');

// var 대신 let/const 권장 (no-var)
const shouldBeConst = 42;

// 함수 선언 후 사용하지 않음
function anotherUnused() {}

// This function will always throw an error
const fetchWithError = async () => {
  const { data } = await client.get('/api/error');

  console.log(data);

  return data;
};

const fetchWithErrorMutation = async () => {
  const { data } = await client.post('/api/error');

  return data;
};

const fetchWithServerError = async () => {
  const { data } = await client.get('/api/server-error');

  return data;
};

const fetchWithServerErrorMutation = async () => {
  const { data } = await client.post('/api/server-error');

  return data;
};

export function QueryTest() {
  const { refetch } = useQuery({
    queryKey: ['test-error'],
    queryFn: fetchWithError,
    enabled: false, // Don't run automatically
    retry: false,
    meta: {
      toast: true,
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

  const { refetch: refetchWithServerError } = useQuery({
    queryKey: ['test-server-error'],
    queryFn: fetchWithServerError,
    enabled: false, // Don't run automatically
    retry: false,
  });

  const { mutate: mutateWithServerError } = useMutation({
    mutationFn: fetchWithServerErrorMutation,
  });

  return (
    <div className="flex gap-4">
      <Button onClick={() => refetch()}>Test Query Error Toast</Button>
      <Button onClick={() => mutateWithError()}>Test Mutation Error Toast</Button>

      <Button onClick={() => refetchWithServerError()}>Test Query Server Error Toast</Button>
      <Button onClick={() => mutateWithServerError()}>Test Mutation ErrorBoundary</Button>
    </div>
  );
}

export default QueryTest;
