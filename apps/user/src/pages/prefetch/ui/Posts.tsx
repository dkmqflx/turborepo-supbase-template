'use client';

import React from 'react';

import { useGetPosts } from '../api/queries';
import type { Post } from '../api/types';

export function Posts() {
  const { data } = useGetPosts();

  return (
    <div className="space-y-4">
      {data?.map((post: Post) => (
        <div key={post.id} className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
