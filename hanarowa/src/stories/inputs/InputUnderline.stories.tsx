// InputUnderline.stories.tsx
import { InputUnderline } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

const meta = {
  title: 'Components/Inputs/InputUnderline',
  component: InputUnderline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className='w-[20rem]'>
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
    type: { control: 'text' },
    readOnly: { control: 'boolean' },
  },
  args: {
    placeholder: '입력하세요',
    fullWidth: true,
    disabled: false,
    type: 'text',
  },
} satisfies Meta<typeof InputUnderline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: '비활성화' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: '읽기 전용' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: '비밀번호' },
};
