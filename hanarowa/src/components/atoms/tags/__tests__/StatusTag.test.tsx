import { STATUS_META } from '@/constants/status';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import React from 'react';
import StatusTag from '../StatusTag';

describe('StatusTag', () => {
  it('활성 상태로 렌더링되어야 한다', () => {
    render(<StatusTag status='complete' />);

    const tag = screen.getByText('완료');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('bg-[#DCFCE7]', 'text-[#166534]');
  });

  it('비활성 상태로 렌더링되어야 한다', () => {
    render(<StatusTag status='complete' isActive={false} />);

    const tag = screen.getByText('완료');
    expect(tag).toHaveClass(
      'border',
      'border-gray-300',
      'bg-transparent',
      'text-gray-400'
    );
  });

  it('상태를 올바르게 표시해야 한다', () => {
    const { rerender } = render(<StatusTag status='reservation' />);
    expect(screen.getByText('예약 중')).toHaveClass(
      'bg-[#EEF2FF]',
      'text-[#4F46E5]'
    );

    rerender(<StatusTag status='inprogress' />);
    expect(screen.getByText('수강 중')).toHaveClass(
      'bg-[#EEF2FF]',
      'text-[#4F46E5]'
    );

    rerender(<StatusTag status='teaching' />);
    expect(screen.getByText('수업 중')).toHaveClass(
      'bg-[#EEF2FF]',
      'text-[#4F46E5]'
    );

    rerender(<StatusTag status='approved' />);
    expect(screen.getByText('승인')).toHaveClass('bg-main', 'text-white');

    rerender(<StatusTag status='rejected' />);
    expect(screen.getByText('반려')).toHaveClass('bg-pink', 'text-white');

    rerender(<StatusTag status='pending' />);
    expect(screen.getByText('대기중')).toHaveClass('bg-orange', 'text-white');
  });

  it('기본 스타일 클래스를 적용해야 한다', () => {
    render(<StatusTag status='complete' />);

    const tag = screen.getByText('완료');
    expect(tag).toHaveClass(
      'font-bold-16',
      'inline-block',
      'rounded-full',
      'px-[1.6rem]',
      'py-[0.8rem]'
    );
  });
});
