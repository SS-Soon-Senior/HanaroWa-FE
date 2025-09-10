// InputUnderline.stories.tsx
import { IcGraysearch } from '@/assets/svg';
import { InputUnderline } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'storybook/internal/preview-api';
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

export const SearchInput: Story = {
  render: () => {
    const [search, setSearch] = useState<string>('');
    return (
      <div className='relative w-full'>
        <InputUnderline
          placeholder='강좌를 검색해보세요'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className='absolute top-[1.2rem] right-[1rem] flex cursor-pointer'
          onClick={() => alert(`검색어: ${search}`)}
        >
          <IcGraysearch />
        </div>
      </div>
    );
  },
};
