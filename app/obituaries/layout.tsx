import { Suspense } from 'react';

export default function ObituariesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading obituaries...</div>}>
      {children}
    </Suspense>
  );
}