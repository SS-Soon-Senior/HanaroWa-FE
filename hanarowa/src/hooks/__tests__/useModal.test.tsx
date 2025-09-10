import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useModal from '../useModal'

describe('useModal', () => {
  it('모달이 닫힌 상태로 초기화되어야 한다', () => {
    const { result } = renderHook(() => useModal())
    
    expect(result.current.isOpen).toBe(false)
  })

  it('openModal을 호출하면 모달이 열려야 한다', () => {
    const { result } = renderHook(() => useModal())
    
    act(() => {
      result.current.openModal()
    })
    
    expect(result.current.isOpen).toBe(true)
  })

  it('closeModal을 호출하면 모달이 닫혀야 한다', () => {
    const { result } = renderHook(() => useModal())
    
    act(() => {
      result.current.openModal()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.closeModal()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('모달 상태가 올바르게 토글되어야 한다', () => {
    const { result } = renderHook(() => useModal())
    
    expect(result.current.isOpen).toBe(false)
    
    act(() => {
      result.current.openModal()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.closeModal()
    })
    expect(result.current.isOpen).toBe(false)
    
    act(() => {
      result.current.openModal()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('함수 참조가 안정적으로 유지되어야 한다', () => {
    const { result, rerender } = renderHook(() => useModal())
    
    const initialOpenModal = result.current.openModal
    const initialCloseModal = result.current.closeModal
    
    rerender()
    
    expect(result.current.openModal).toBe(initialOpenModal)
    expect(result.current.closeModal).toBe(initialCloseModal)
  })
})