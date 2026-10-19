import { createElement, useState } from 'react';

import { ArrowButton } from './ArrowButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArrowButton> = {
  component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
  render: () =>
    createElement(() => {
      const [IsSidebarOpen, setIsSidebarOpen] = useState(false);

      return <ArrowButton IsSidebarOpen={IsSidebarOpen} onClick={() => setIsSidebarOpen(!IsSidebarOpen)} />;
    }),
};
