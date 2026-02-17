'use client';

import { startTransition, useState, type ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PromptSummary } from '@/shared/types/prompt';

export interface SidebarContentProps {
  prompts: PromptSummary[];
}

export const useSidebarContentModel = ({ prompts }: SidebarContentProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams?.get('q') ?? '');

  const router = useRouter();

  const handleCollapseSidebar = () => setIsCollapsed(true);
  const handleExpandSidebar = () => setIsCollapsed(false);

  const handleNavigateToNewPromptPage = () => router.push('/new');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    startTransition(() => {
      const url = newQuery ? `/?q=${encodeURIComponent(newQuery)}` : '/';
      router?.push?.(url, { scroll: false });
    });
  };

  return {
    prompts,
    isCollapsed,
    handleCollapseSidebar,
    handleExpandSidebar,
    handleNavigateToNewPromptPage,
    handleQueryChange,
    query,
  };
};
