import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import React from 'react';
import TextArea from '../Textarea';

describe('TextArea', () => {
  it('기본 props로 렌더링되어야 한다', () => {
    render(<TextArea placeholder='내용을 입력하세요' />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', '내용을 입력하세요');
  });

  it('disabled 상태를 적용해야 한다', () => {
    render(<TextArea disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('커스텀 className을 적용해야 한다', () => {
    render(<TextArea className='custom-textarea' />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('커스텀 className을 적용해야 한다', () => {
    const { container } = render(
      <TextArea containerClassName='custom-container' />
    );

    const textareaContainer = container.firstChild;
    expect(textareaContainer).toHaveClass('custom-container');
  });

  it('사용자 입력을 처리해야 한다', async () => {
    const user = userEvent.setup();
    render(<TextArea />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, '여러 줄\n텍스트 입력');

    expect(textarea).toHaveValue('여러 줄\n텍스트 입력');
  });

  it('HTML textarea props를 전달해야 한다', () => {
    render(<TextArea data-testid='custom-textarea' rows={5} maxLength={100} />);

    const textarea = screen.getByTestId('custom-textarea');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('기본 스타일 클래스를 적용해야 한다', () => {
    render(<TextArea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'font-medium-18',
      'placeholder:text-gray3af',
      'w-full',
      'resize-none',
      'bg-transparent',
      'text-black',
      'outline-none'
    );
  });

  it('컨테이너에 기본 스타일을 적용해야 한다', () => {
    const { container } = render(<TextArea />);

    const textareaContainer = container.firstChild;
    expect(textareaContainer).toHaveClass(
      'border-gray7eb',
      'rounded-16',
      'flex',
      'border-[0.2rem]',
      'bg-white',
      'px-[2rem]',
      'py-[1.7rem]'
    );
  });

  it('여러 줄 텍스트를 올바르게 처리해야 한다', async () => {
    const user = userEvent.setup();
    render(<TextArea />);

    const textarea = screen.getByRole('textbox');
    const multilineText = '첫 번째 줄\n두 번째 줄\n세 번째 줄';

    await user.type(textarea, multilineText);

    expect(textarea).toHaveValue(multilineText);
  });
});
