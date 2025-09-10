import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import CategoryTag from '../CategoryTag';

describe('CategoryTag', () => {
  it('기본 상태로 렌더링되어야 한다', () => {
    render(<CategoryTag category='DIGITAL' />);

    const tag = screen.getByText('디지털/IT');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('bg-[#EEF2FF]', 'text-[#4F46E5]');
  });

  it('클릭 가능한 상태로 렌더링되어야 한다', () => {
    const handleClick = vi.fn();
    render(<CategoryTag category='DIGITAL' onClick={handleClick} />);

    const tag = screen.getByText('디지털/IT');
    expect(tag).toHaveClass('cursor-pointer');
  });

  it('클릭 이벤트를 처리해야 한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CategoryTag category='DIGITAL' onClick={handleClick} />);

    await user.click(screen.getByText('디지털/IT'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('다양한 카테고리를 올바르게 표시해야 한다', () => {
    const { rerender } = render(<CategoryTag category='CULTURE' />);
    expect(screen.getByText('문화/예술')).toHaveClass(
      'bg-[#FEF3C7]',
      'text-[#D97706]'
    );

    rerender(<CategoryTag category='LANGUAGE' />);
    expect(screen.getByText('어학/인문')).toHaveClass(
      'bg-[#FCE1DC]',
      'text-[#D74545]'
    );

    rerender(<CategoryTag category='HEALTH' />);
    expect(screen.getByText('건강')).toHaveClass(
      'bg-[#DCFCE7]',
      'text-[#166534]'
    );

    rerender(<CategoryTag category='TREND' />);
    expect(screen.getByText('트렌드')).toHaveClass(
      'bg-[#FFE8FF]',
      'text-[#B152B5]'
    );

    rerender(<CategoryTag category='FINANCE' />);
    expect(screen.getByText('금융')).toHaveClass('bg-main', 'text-white');

    rerender(<CategoryTag category='OTHERS' />);
    expect(screen.getByText('기타')).toHaveClass(
      'bg-[#DAD3DA]',
      'text-[#6A6B8E]'
    );
  });

  it('기본 스타일 클래스를 적용해야 한다', () => {
    render(<CategoryTag category='DIGITAL' />);

    const tag = screen.getByText('디지털/IT');
    expect(tag).toHaveClass(
      'font-bold-14',
      'flex',
      'h-fit',
      'w-fit',
      'flex-shrink-0',
      'rounded-full',
      'px-[1.6rem]',
      'py-[0.8rem]'
    );
  });

  it('disabled 상태에서는 기본 스타일을 무시해야 한다', () => {
    render(<CategoryTag category='DIGITAL' disabled />);

    const tag = screen.getByText('디지털/IT');
    expect(tag).toHaveClass('bg-gray4f6', 'text-gray3af');
    expect(tag).not.toHaveClass('bg-[#EEF2FF]', 'text-[#4F46E5]');
  });

  it('onClick이 없으면 cursor-pointer 클래스가 없어야 한다', () => {
    render(<CategoryTag category='DIGITAL' />);

    const tag = screen.getByText('디지털/IT');
    expect(tag).not.toHaveClass('cursor-pointer');
  });
});
