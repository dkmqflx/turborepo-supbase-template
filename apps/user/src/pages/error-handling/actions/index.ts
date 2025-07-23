'use server';

import { BASE_URL } from '@/shared/constants/api';

// NOTE:
// Server actions handle errors by returning response values instead of throwing errors.
// The calling component is responsible for handling the error based on the returned response.
// This approach provides better control over error handling in the UI layer.
//
// If you throw errors inside the function to pass error messages, the following error will appear in production:
// Uncaught (in promise) Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.
//
// official docs for error handling in server actions:
// https://nextjs.org/docs/app/getting-started/error-handling

export async function serverActionError() {
  const res = await fetch(`${BASE_URL}/api/error`, {
    method: 'POST',
  });

  const json = await res.json();

  return { result: json };
}

export async function serverActionSuccess() {
  const res = await fetch(`${BASE_URL}/api/success`, {
    method: 'POST',
  });

  const json = await res.json();

  return { result: json };
}
