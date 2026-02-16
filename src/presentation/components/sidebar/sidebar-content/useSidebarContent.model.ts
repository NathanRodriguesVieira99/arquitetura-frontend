'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Prompt } from '@/shared/interfaces/prompt';

export interface SidebarContentProps {
  prompts: Prompt[];
}

export const useSidebarContentModel = ({ prompts }: SidebarContentProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const router = useRouter();

  const handleCollapseSidebar = () => setIsCollapsed(true);
  const handleExpandSidebar = () => setIsCollapsed(false);

  const handleNavigateToNewPromptPage = () => router.push('/new');

  return {
    prompts,
    isCollapsed,
    handleCollapseSidebar,
    handleExpandSidebar,
    handleNavigateToNewPromptPage,
  };
};
