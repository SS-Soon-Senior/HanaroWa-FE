import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'storybook/internal/preview-api';
import { fn } from 'storybook/test';
import React from 'react';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className='w-[20rem]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: '확인',
    variant: 'green',
    sizeType: 'md',
    onClick: () => {
      fn();
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'green', children: 'Default' },
  parameters: { controls: { disable: true } }, // 👈 컨트롤 숨김
};

export const Disabled: Story = {
  args: { variant: 'disabled', children: 'Disabled' },
  parameters: { controls: { disable: true } },
};

export const Select: Story = {
  render: function Render(args) {
    const [variant, setVariant] = useState(args.variant);

    const handleClick = () => {
      const newVariant = variant === 'green' ? 'line' : 'green';
      setVariant(newVariant);
    };

    return <Button {...args} variant={variant} onClick={handleClick} />;
  },
  args: {
    variant: 'line',
    children: 'Select',
  },
};

export const Cancel: Story = {
  args: { variant: 'lightgray', children: 'Cancel' },
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  args: { variant: 'green' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className='flex flex-col gap-4'>
      <Button sizeType='lg'>lg</Button>
      <Button sizeType='md'>md</Button>
      <Button sizeType='sm'>sm</Button>
      <Button sizeType='xs'>xs</Button>
      <Button sizeType='reserve'>reserve</Button>
    </div>
  ),
};

export const Playground: Story = {
  args: { children: 'Playground', variant: 'green', sizeType: 'md' },
  parameters: {
    controls: {
      include: ['variant', 'sizeType', 'children'],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['green', 'disabled', 'lightgray', 'line'],
    },
    sizeType: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm', 'xs', 'reserve'],
    },
  },
};
