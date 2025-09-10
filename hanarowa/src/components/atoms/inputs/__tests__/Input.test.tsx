import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import React from 'react';
import Input from '../Input';

describe('Input', () => {
  it('기본 props로 렌더링되어야 한다', () => {
    render(<Input placeholder='입력하세요' />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '입력하세요');
  });

  it('disabled 상태를 적용해야 한다', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('커스텀 className을 적용해야 한다', () => {
    render(<Input className='custom-input' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('컨테이너 커스텀 className을 적용해야 한다', () => {
    const { container } = render(
      <Input containerClassName='custom-container' />
    );

    const inputContainer = container.firstChild;
    expect(inputContainer).toHaveClass('custom-container');
  });

  it('사용자 입력을 처리해야 한다', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test input');

    expect(input).toHaveValue('test input');
  });

  it('HTML input props를 전달해야 한다', () => {
    render(<Input type='email' data-testid='email-input' maxLength={50} />);

    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('maxLength', '50');
  });

  it('포커스 상태를 처리해야 한다', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    expect(input).toHaveFocus();
  });
});
