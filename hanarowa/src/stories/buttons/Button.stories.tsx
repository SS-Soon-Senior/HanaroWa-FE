import { Button } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // ❌ 여기의 exclude를 제거하세요
    // controls: { exclude: ['variant', 'sizeType'] },
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
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } }, // 👈 컨트롤 숨김
};

export const Disabled: Story = {
  args: { variant: 'disabled', children: '비활성화' },
  parameters: { controls: { disable: true } },
};

export const LightGray: Story = {
  args: { variant: 'lightgray', children: '라이트그레이' },
  parameters: { controls: { disable: true } },
};

export const Line: Story = {
  args: { variant: 'line', children: '라인 버튼' },
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
