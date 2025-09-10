import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDebounce from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('함수 호출이 디바운스되어야 한다', () => {
    const mockCallback = vi.fn()
    const delay = 500

    renderHook(() => useDebounce(mockCallback, delay, []))

    expect(mockCallback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(delay - 1)
    })
    expect(mockCallback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('종속성이 변경되면 타이머가 리셋되어야 한다', () => {
    const mockCallback = vi.fn()
    const delay = 500
    let dep = 'initial'

    const { rerender } = renderHook(() => useDebounce(mockCallback, delay, [dep]))

    act(() => {
      vi.advanceTimersByTime(250)
    })

    dep = 'changed'
    rerender()

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(mockCallback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('콜백 함수에 인수를 전달해야 한다', () => {
    const mockCallback = vi.fn()
    const delay = 500
    const arg1 = 'test'
    const arg2 = 123

    renderHook(() => useDebounce(mockCallback, delay, [], arg1, arg2))

    act(() => {
      vi.advanceTimersByTime(delay)
    })

    expect(mockCallback).toHaveBeenCalledWith(arg1, arg2)
  })

  it('종속성이 빠르게 변경되면 이전 타이머를 취소해야 한다', () => {
    const mockCallback = vi.fn()
    const delay = 500
    let counter = 0

    const { rerender } = renderHook(() => useDebounce(mockCallback, delay, [counter]))

    counter = 1
    rerender()
    
    act(() => {
      vi.advanceTimersByTime(250)
    })

    counter = 2
    rerender()

    act(() => {
      vi.advanceTimersByTime(250)
    })

    counter = 3
    rerender()

    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(mockCallback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})