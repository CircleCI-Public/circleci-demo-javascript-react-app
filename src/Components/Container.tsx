import type { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-6xl px-4 pt-20 pb-8">{children}</main>;
}
