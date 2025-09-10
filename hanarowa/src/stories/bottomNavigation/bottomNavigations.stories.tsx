import { BottomNavigation } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className='relative h-screen w-full bg-gray-100'>
        <div className='p-4'>
          <p>Page Content</p>
        </div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectedItem: {
      control: 'select',
      options: ['home', 'ai', 'mypage'],
      description: 'Sets the initially selected navigation item.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedItem: 'home',
  },
};

export const AISelected: Story = {
  args: {
    selectedItem: 'ai',
  },
};

export const MyPageSelected: Story = {
  args: {
    selectedItem: 'mypage',
  },
};
