'use client';

import { SidebarContentView } from './sidebar-content.view';
import { useSidebarContentModel, type SidebarContentProps } from './useSidebarContent.model';

export const SidebarContent = ({ prompts }: SidebarContentProps) => {
  const model = useSidebarContentModel({ prompts });

  return <SidebarContentView {...model} />;
};
