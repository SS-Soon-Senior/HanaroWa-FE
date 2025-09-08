// Input.stories.tsx
import { IcCloseeye, IcGraysearch, IcOpeneye, IcSearch } from '@/assets/svg';
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

export const NumberInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        type='number'
        containerClassName='max-w-[10rem]'
        onChange={(e) => setValue(e.target.value)}
        placeholder='20'
        rightContent={
          <span className='font-medium-20 font-hana text-black'>명</span>
        }
      />
    );
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Input
        type={open ? 'text' : 'password'}
        placeholder='비밀번호 입력'
        rightContent={
          open ? (
            <button type='button' onClick={() => setOpen(false)}>
              <IcOpeneye />
            </button>
          ) : (
            <button type='button' onClick={() => setOpen(true)}>
              <IcCloseeye />
            </button>
          )
        }
      />
    );
  },
};
