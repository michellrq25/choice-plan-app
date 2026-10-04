'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_TARGET_NAME, DEFAULT_TARGET_NICKNAME } from '@/lib/targetConfig';

export interface TargetProfile {
  fullName: string;
  nickname: string;
}

export function useTargetProfile(): TargetProfile {
  const searchParams = useSearchParams();

  return useMemo(() => {
    // Buscar en los parámetros de la URL (?nombre=..., ?name=..., ?para=...)
    const urlName =
      searchParams.get('nombre') ||
      searchParams.get('name') ||
      searchParams.get('para');

    // Buscar apodo (?apodo=...) o usar el nombre
    const urlNickname = searchParams.get('apodo');

    const fullName = urlName?.trim() || DEFAULT_TARGET_NAME;
    const nickname = urlNickname?.trim() || (urlName?.trim() || DEFAULT_TARGET_NICKNAME);

    return {
      fullName,
      nickname,
    };
  }, [searchParams]);
}
