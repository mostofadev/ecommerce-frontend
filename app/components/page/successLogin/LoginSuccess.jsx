'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/components/ui/loader/pageSpinner'; // loader থাকলে এটিই

export default function LoginSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('user_token', token);
      router.push('/user/orders');
    }
  }, [searchParams, router]);

  return <Loader />;
}
