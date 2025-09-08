import { Header } from '@components';
// Adjust this import path to your actual component path
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Add decorators to simulate the component's typical environment
  decorators: [
    (Story) => (
      // This div simulates the padding/space the header would occupy
      <div className='relative h-[9rem] w-full bg-gray-200'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the center of the header.',
    },
    showBackButton: {
      control: 'boolean',
      description: 'Determines if the back button is visible.',
    },
    showSearchButton: {
      control: 'boolean',
      description: 'Determines if the search button is visible.',
    },
    backUrl: {
      control: 'text',
      description: 'The URL the back button should navigate to.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '뒤로가기포함',
    showBackButton: true,
    showSearchButton: false,
  },
};

export const WithSearchButton: Story = {
  args: {
    title: '검색 페이지',
    showBackButton: true,
    showSearchButton: true,
  },
};

export const TitleOnly: Story = {
  args: {
    title: '제목만',
    showBackButton: false,
    showSearchButton: false,
  },
};
