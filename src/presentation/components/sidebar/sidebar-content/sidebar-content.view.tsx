'use client';

import type { FC } from 'react';
import type { useSidebarContentModel } from './useSidebarContent.model';
import { Button } from '@/presentation/components/ui/button';
import { ArrowLeftToLine, ArrowRightToLine, Plus, X } from 'lucide-react';
import { Logo } from '../../logo';
import { Input } from '../../ui/input';

export const SidebarContentView: FC<
  ReturnType<typeof useSidebarContentModel>
> = ({
  prompts,
  isCollapsed,
  handleCollapseSidebar,
  handleExpandSidebar,
  handleNavigateToNewPromptPage,
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-full w-[80vw] flex-col border-r border-gray-700 bg-gray-800 transition-[transform,width] duration-300 ease-in-out sm:w-[320px] md:relative md:z-auto ${isCollapsed ? 'md:w-18' : 'md:w-[384px]'}`}
    >
      {isCollapsed && (
        <section className="px-2 py-6">
          <header className="mb-6 flex items-center justify-center">
            <Button
              title="Expandir menu lateral"
              aria-label="Expandir menu lateral"
              onClick={handleExpandSidebar}
              variant={'icon'}
              className="focus:ring-accent-500 hidden rounded-lg p-2 transition-colors hover:bg-gray-700 focus:ring-2 focus:outline-none md:inline-flex"
            >
              <ArrowRightToLine size={20} className="text-gray-100" />
            </Button>
          </header>
        </section>
      )}

      {!isCollapsed && (
        <>
          <section className="p-6">
            <div className="mb-4 md:hidden">
              <div className="flex items-center justify-between">
                <Button variant={'secondary'}>
                  <X size={20} color="#6a7282" />
                </Button>
              </div>
            </div>

            <div className="mb-6 flex w-full items-center justify-between">
              <header className="flex w-full items-center justify-between">
                <Logo />
                <Button
                  onClick={handleCollapseSidebar}
                  aria-label="Fechar menu lateral"
                  title="Fechar menu lateral"
                  variant={'icon'}
                  className="focus:ring-accent-accent-500 hidden rounded-lg p-2 transition-colors hover:bg-gray-700 focus:ring-2 focus:outline-none md:inline-flex"
                >
                  <ArrowLeftToLine size={20} className="text-gray-100" />
                </Button>
              </header>
            </div>

            <section className="mb-5">
              <form>
                <Input
                  placeholder="Buscar prompts..."
                  name="q"
                  type="text"
                  autoFocus
                />
              </form>
            </section>

            <div>
              <Button
                onClick={handleNavigateToNewPromptPage}
                title="Novo prompt"
                className="w-full"
                size={'lg'}
              >
                <Plus size={20} className="mr-2" />
                Novo Prompt
              </Button>
            </div>
          </section>
        </>
      )}

      {prompts.map((prompt, id) => (
        <p key={id}>{prompt.title}</p>
      ))}
    </aside>
  );
};
