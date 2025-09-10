import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import IconButton from '../IconButton';

describe('IconButton', () => {
  it('기본 props로 렌더링되어야 한다', () => {
    render(<IconButton title='테스트 버튼' />);

    const button = screen.getByRole('button', { name: '테스트 버튼' });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('테스트 버튼')).toHaveClass(
      'font-medium-16',
      'text-black'
    );
  });

  it('아이콘과 함께 렌더링되어야 한다', () => {
    const TestIcon = <span data-testid='test-icon'>아이콘</span>;
    render(<IconButton title='아이콘 버튼' icon={TestIcon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('아이콘 버튼')).toBeInTheDocument();
  });

  it('disabled 상태를 적용해야 한다', () => {
    render(<IconButton title='비활성 버튼' disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('클릭 이벤트를 처리해야 한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<IconButton title='클릭 버튼' onClick={handleClick} />);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('기본 스타일 클래스를 적용해야 한다', () => {
    render(<IconButton title='스타일 버튼' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'size-[75px]',
      'rounded-16',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-2',
      'shadow-button'
    );
  });

  it('커스텀 className을 적용해야 한다', () => {
    render(<IconButton title='커스텀 버튼' className='custom-class' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('children을 렌더링해야 한다', () => {
    render(
      <IconButton title='자식 요소 버튼'>
        <span data-testid='child-element'>자식 요소</span>
      </IconButton>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  it('HTML button props를 전달해야 한다', () => {
    render(
      <IconButton
        title='HTML props 버튼'
        data-testid='html-props-button'
        type='submit'
      />
    );

    const button = screen.getByTestId('html-props-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('disabled 상태에서는 클릭할 수 없어야 한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton title='비활성 클릭 버튼' onClick={handleClick} disabled />
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('아이콘과 제목이 올바른 순서로 표시되어야 한다', () => {
    const TestIcon = <span data-testid='test-icon'>🔥</span>;
    const { container } = render(
      <IconButton title='순서 테스트' icon={TestIcon} />
    );

    const button = container.querySelector('button');
    const children = Array.from(button!.children);

    expect(children[0]).toHaveAttribute('data-testid', 'test-icon');
    expect(children[1]).toHaveTextContent('순서 테스트');
  });
});
