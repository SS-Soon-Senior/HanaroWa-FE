'use client';

import { useLessonEdit } from '@/hooks';
import { createContext, ReactNode, useContext } from 'react';

type Ctx = ReturnType<typeof useLessonEdit>;
const LessonEditContext = createContext<Ctx | null>(null);

export function LessonEditProvider({
  id,
  children,
}: {
  id: string | undefined;
  children: ReactNode;
}) {
  const value = useLessonEdit(id);
  return (
    <LessonEditContext.Provider value={value}>
      {children}
    </LessonEditContext.Provider>
  );
}

export function useLessonEditContext() {
  const ctx = useContext(LessonEditContext);
  if (!ctx)
    throw new Error(
      'useLessonEditContext must be used within LessonEditProvider'
    );
  return ctx;
}
