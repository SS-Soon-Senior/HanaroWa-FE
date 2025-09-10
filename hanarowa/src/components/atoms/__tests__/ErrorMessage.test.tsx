import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import React from 'react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('기본 props로 렌더링되어야 한다', () => {
    render(<ErrorMessage>에러 메시지입니다</ErrorMessage>);

    expect(screen.getByText('에러 메시지입니다')).toBeInTheDocument();
  });

  it('커스텀 className을 적용해야 한다', () => {
    render(<ErrorMessage className='custom-error'>에러</ErrorMessage>);

    const errorText = screen.getByText('에러');
    expect(errorText).toHaveClass('custom-error');
  });

  it('텍스트 정렬을 적용해야 한다', () => {
    const { rerender } = render(
      <ErrorMessage align='text-center'>중앙 정렬</ErrorMessage>
    );
    expect(screen.getByText('중앙 정렬')).toHaveClass('text-center');

    rerender(<ErrorMessage align='text-right'>우측 정렬</ErrorMessage>);
    expect(screen.getByText('우측 정렬')).toHaveClass('text-right');

    rerender(<ErrorMessage align='text-left'>좌측 정렬</ErrorMessage>);
    expect(screen.getByText('좌측 정렬')).toHaveClass('text-left');
  });

  it('아이콘과 텍스트가 함께 표시되어야 한다', () => {
    render(<ErrorMessage>에러 메시지</ErrorMessage>);

    const container = screen.getByText('에러 메시지').parentElement;
    expect(container).toHaveClass(
      'flex',
      'flex-row',
      'items-center',
      'gap-[0.5rem]'
    );
  });
});
