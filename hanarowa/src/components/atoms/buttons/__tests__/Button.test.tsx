import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('기본 props로 렌더링되어야 한다', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-main', 'text-white')
  })

  it('다양한 variant로 렌더링되어야 한다', () => {
    const { rerender } = render(<Button variant="disabled">Disabled</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-disable', 'text-white')
    expect(screen.getByRole('button')).toBeDisabled()

    rerender(<Button variant="lightgray">Light Gray</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray4f6', 'text-gray280')

    rerender(<Button variant="line">Line</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-opacity-0', 'text-black')
  })

  it('다양한 크기로 렌더링되어야 한다', () => {
    const { rerender } = render(<Button sizeType="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('font-bold-22', 'rounded-8')

    rerender(<Button sizeType="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('font-medium-20', 'rounded-12')

    rerender(<Button sizeType="xs">Extra Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('font-medium-16', 'rounded-8')
  })

  it('클릭 이벤트를 처리해야 한다', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('커스텀 className을 적용해야 한다', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('HTML button props를 전달해야 한다', () => {
    render(<Button data-testid="custom-button" type="submit">Submit</Button>)
    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('disabled variant는 클릭할 수 없어야 한다', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button variant="disabled" onClick={handleClick}>Disabled</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})