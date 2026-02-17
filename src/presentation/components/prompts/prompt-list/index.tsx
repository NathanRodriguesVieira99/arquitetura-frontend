import type { PromptSummary } from '@/shared/types/prompt';
import type { FC } from 'react';
import { PromptCard } from '../prompt-card';

interface PromptListProps {
  prompts: PromptSummary[];
}

export const PromptList: FC<PromptListProps> = ({ prompts }) => {
  return (
    <ul className="space-y-2">
      {prompts.map((prompt, id) => (
        <PromptCard key={id} prompt={prompt} />
      ))}
    </ul>
  );
};
