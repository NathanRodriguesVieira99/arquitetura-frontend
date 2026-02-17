import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PromptCard } from '.';
import { faker } from '@faker-js/faker';

const meta = {
  component: PromptCard,
  // tags: ['autodocs'],
  decorators: [(Story) => <body className="w-96 bg-gray-900">{Story()}</body>],
} satisfies Meta<typeof PromptCard>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prompt: {
      id: String(Math.random()),
      title: `${faker.hacker.phrase()} ${faker.string.alphanumeric(4)}`,
      content: [
        `Context: ${faker.lorem.sentences(2)}`,
        `Goal: ${faker.company.catchPhrase()}`,
        `Details: ${faker.lorem.paragraph(2)}`,
      ].join('\n'),
    },
  },
};

export default meta;
