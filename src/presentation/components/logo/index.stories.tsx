import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from '.';

const meta = {
  component: Logo,
  // tags: ['autodocs'],
  decorators: [(Story) => <body className="bg-gray-900">{Story()}</body>],
} satisfies Meta<typeof Logo>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
