// ✅ Server Component
import LoginSuccess from '@/app/components/page/successLogin/LoginSuccess';
import { Suspense } from 'react';

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Redirecting...</div>}>
      <LoginSuccess />
    </Suspense>
  );
}
