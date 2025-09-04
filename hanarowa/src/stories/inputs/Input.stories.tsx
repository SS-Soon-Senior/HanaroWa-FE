// Input.stories.tsx
import { Input } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className='w-[40rem]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: { control: 'text' },
    containerClassName: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    placeholder: '입력하세요',
    fullWidth: true,
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: '비활성화됨' },
};

export const WithRightContent: Story = {
  render: () => (
    <Input
      placeholder='입력하세요'
      rightContent={
        <button
          type='button'
          className='rounded-8 ml-2 flex items-center justify-center border border-gray-300 px-3 py-1 text-[16px] whitespace-nowrap'
          onClick={() => alert('검색')}
        >
          검색
        </button>
      }
    />
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='입력하면 오른쪽에 버튼 생김'
        rightContent={
          value ? (
            <button
              type='button'
              className='rounded-8 ml-2 flex items-center px-3 text-[16px] whitespace-nowrap ring-1 ring-gray-300'
              onClick={() => setValue('')}
            >
              지우기
            </button>
          ) : null
        }
      />
    );
  },
};
