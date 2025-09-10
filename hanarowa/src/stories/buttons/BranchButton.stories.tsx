import { BranchButton } from '@components';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Buttons/BranchButton',
  component: BranchButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    location: { control: 'text', description: '지역/도시 등 상단 라벨' },
    branch: { control: 'text', description: '지점 명칭' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    className: { control: 'text', description: 'Tailwind 클래스 오버라이드' },
    onClick: { action: 'clicked' },
  },
  args: {
    location: '대전',
    branch: '하나 50+ 컬처뱅크',
  },
  decorators: [
    (Story) => (
      <div className='w-[20rem]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BranchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { style: { padding: '1rem' } },
  render: (args) => <BranchButton {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: false,
    style: { padding: '1rem' },
  },
  render: (args) => <BranchButton {...args} />,
};

export const GridBranchButton: Story = {
  args: {
    disabled: false,
    style: { padding: '1rem' },
  },
  parameters: {
    controls: { exclude: ['location', 'branch', 'children'] },
  },
  render: (args) => {
    const items = [
      { location: '춘천', branch: '하나 컬처뱅크\n50+ 라운지' },
      { location: '대전', branch: '하나 50+ 컬처뱅크' },
      { location: '천안', branch: '하나 컬처뱅크 천안' },
      { location: '서울', branch: '하나 컬처뱅크 강남' },
    ];

    return (
      <div className='grid w-[40rem] grid-cols-2 gap-x-6 gap-y-10 pb-12'>
        {items.map((it, i) => (
          <BranchButton key={i} {...args} {...it} />
        ))}
      </div>
    );
  },
};
