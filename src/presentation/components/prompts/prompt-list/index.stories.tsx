import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PromptList } from '.';
import { faker } from '@faker-js/faker';

const meta = {
  component: PromptList,
  // tags: ['autodocs'],
  decorators: [(Story) => <body className="w-96 bg-gray-900">{Story()}</body>],
  args: {
    prompts: Array.from({ length: 3 }).map(() => ({
      id: String(Math.random()),
      title: `${faker.hacker.phrase()} ${faker.string.alphanumeric(4)}`,
      content: [
        `Context: ${faker.lorem.sentences(2)}`,
        `Goal: ${faker.company.catchPhrase()}`,
        `Details: ${faker.lorem.paragraph(2)}`,
      ].join('\n'),
    })),
  },
} satisfies Meta<typeof PromptList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
