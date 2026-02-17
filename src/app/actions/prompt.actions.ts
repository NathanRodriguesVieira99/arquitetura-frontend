'use server';

import prisma from '@/lib/prisma';
import type { PromptSummary } from '@/shared/types/prompt';

type SearchFormState = {
  success: boolean;
  prompts?: PromptSummary[];
  message?: string;
};

export async function searchPromptAction(
  _prev: SearchFormState,
  formData: FormData
): Promise<SearchFormState> {
  const term = String(formData.get('q') ?? '').trim();

  try {
    /**
     SELECT * FROM prompt 
     WHERE title ILIKE '%term%' OR content ILIKE %term% 
     ORDER BY created_at DESC;
     */
    const prompts = await prisma.prompt.findMany({
      where: term
        ? {
            OR: [
              { title: { contains: term, mode: 'insensitive' } },
              { content: { contains: term, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const summaries = prompts.map(({ id, title, content }) => ({
      id,
      title,
      content,
    }));

    return {
      success: true,
      prompts: summaries,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: 'Falha ao buscar prompts',
    };
  }
}
