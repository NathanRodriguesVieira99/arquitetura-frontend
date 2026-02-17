import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { faker } from '@faker-js/faker';
import { SidebarContentView } from './sidebar-content.view';

const meta = {
  component: SidebarContentView,
  // tags: ['autodocs'],
  decorators: [],
  args: {
    handleCollapseSidebar: () => {},
    handleExpandSidebar: () => {},
    handleNavigateToNewPromptPage: () => {},
    isCollapsed: false,
    prompts: Array.from({ length: 3 }).map(() => ({
      id: String(Math.random()),
      title: `${faker.hacker.phrase()} ${faker.string.alphanumeric(4)}`,
      content: [
        `Context: ${faker.lorem.sentences(2)}`,
        `Goal: ${faker.company.catchPhrase()}`,
        `Details: ${faker.lorem.paragraph(2)}`,
      ].join('\n'),
    })),
    handleQueryChange: () => {},
    query: 'Criar testes E2E',
  },
} satisfies Meta<typeof SidebarContentView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isCollapsed: false,
  },
};
export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
};
