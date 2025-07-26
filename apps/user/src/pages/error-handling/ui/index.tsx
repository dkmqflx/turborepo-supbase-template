'use client';

import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/sonner';
import { ApiError } from '@repo/utils/apiError';

import { client } from '@/shared/lib/apiClient';

import { serverActionError, serverActionSuccess } from '../actions';

// useQuery
const fetchWithSuccess = async () => {
  const { data } = await client.get<string>('/api/success');

  return data;
};

const fetchWithError = async () => {
  const { data } = await client.get('/api/error');

  return data;
};

// useMutation
const fetchWithSuccessMutation = async () => {
  const { data } = await client.post('/api/success');

  console.log('data', data);

  return data;
};

const fetchWithErrorMutation = async () => {
  const { data } = await client.post('/api/error');

  return data;
};

// Server Action
const fetchWithServerError = async () => {
  const { data } = await client.get('/api/server-error');

  return data;
};

const fetchWithServerErrorMutation = async () => {
  const { data } = await client.post('/api/server-error');

  return data;
};

export function ErrorHandling() {
  const { refetch: refetchWithSuccess, data: dataWithSuccess } = useQuery({
    queryKey: ['test-success'],
    queryFn: fetchWithSuccess,
    enabled: false, // Don't run automatically
    retry: false,
    meta: {
      toast: true,
      message: 'Test Query Success Toast',
    },
  });

  console.log('dataWithSuccess', dataWithSuccess);

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

  const { mutate: mutateWithSuccess } = useMutation({
    mutationFn: fetchWithSuccessMutation,
    onSuccess: (data) => {
      toast.success('Test Mutation Success Toast');
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

  const handleServerActionError = async () => {
    const { result } = await serverActionError();

    if (!result.isSuccess) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  const handleServerActionSuccess = async () => {
    const { result } = await serverActionSuccess();

    if (!result.isSuccess) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* useQuery */}
      <div className="flex gap-4">
        <Button onClick={() => refetchWithSuccess()}>Test Query Success Toast</Button>
        <Button onClick={() => refetch()}>Test Query Error Toast</Button>
      </div>

      {/* useMutation */}
      <div className="flex gap-4">
        <Button onClick={() => mutateWithSuccess()}>Test Mutation Success Toast</Button>
        <Button onClick={() => mutateWithError()}>Test Mutation Error Toast</Button>
      </div>

      {/* ErrorBoundary */}
      <div className="flex gap-4">
        <Button onClick={() => refetchWithServerError()}>useQuery ErrorBoundary</Button>
        <Button onClick={() => mutateWithServerError()}>useMutation ErrorBoundary</Button>
      </div>

      {/* server action */}
      <div className="flex gap-4">
        <Button onClick={handleServerActionError}>Server Action Error</Button>
        <Button onClick={handleServerActionSuccess}>Server Action Success</Button>
      </div>
    </div>
  );
}

export default ErrorHandling;
