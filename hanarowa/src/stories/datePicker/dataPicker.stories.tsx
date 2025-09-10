import { DatePicker } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-[30rem]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected date value in "YYYY-MM-DD" format.',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback function that fires when a date is selected.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to show when no date is selected.',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date.',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the date picker if true.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Interactive Example
 * This is the primary story for testing the DatePicker. It uses React's `useState` to manage the selected date, allowing you to see the `onChange` event in action.
 */
export const Interactive: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<string>(args.value || '');

    return (
      <DatePicker
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          args.onChange(newDate); // Also call the Storybook action
        }}
      />
    );
  },
  args: {
    value: '',
    placeholder: '날짜를 선택해 주세요',
  },
};

/**
 * ### With Initial Value
 * This story shows the DatePicker with a pre-selected date.
 */
export const WithInitialValue: Story = {
  args: {
    value: '2025-10-24',
  },
};

/**
 * ### With Placeholder
 * This story demonstrates the placeholder text when no value is provided.
 */
export const WithPlaceholder: Story = {
  args: {
    value: '',
    placeholder: '생년월일을 입력하세요',
  },
};

/**
 * ### Disabled State
 * This story shows the DatePicker in its disabled state.
 */
export const Disabled: Story = {
  args: {
    value: '',
    disabled: true,
  },
};

/**
 * ### With Date Range
 * This story restricts the selectable dates between a minimum and maximum date.
 */
export const WithDateRange: Story = {
  args: {
    value: '2025-09-15',
    minDate: '2025-09-10',
    maxDate: '2025-09-20',
  },
};
