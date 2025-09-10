import { describe, expect, it } from 'vitest'
import {
  formatDuration,
  formatPrice,
  formatStartDate,
  formatLessonTime,
  calculateDurationInWeeks,
  formatPhone,
  formatDateToISO,
  formatDateFromISO,
} from '../formatter'

describe('formatter 유틸', () => {
  describe('formatDuration', () => {
    it('기간 문자열을 올바르게 포맷해야 한다', () => {
      expect(formatDuration('2024-03-15~2024-04-15')).toBe('03월 15일')
    })

    it('~ 구분자가 없으면 원본 문자열을 반환해야 한다', () => {
      expect(formatDuration('2024-03-15')).toBe('2024-03-15')
    })

    it('비어있거나 falsy 값이면 원본 문자열을 반환해야 한다', () => {
      expect(formatDuration('')).toBe('')
      expect(formatDuration(null as any)).toBe(null)
    })
  })

  describe('formatPrice', () => {
    it('한국식 숫자 형식으로 포맷해야 한다', () => {
      expect(formatPrice(10000)).toBe('10,000')
      expect(formatPrice(1000000)).toBe('1,000,000')
      expect(formatPrice(0)).toBe('0')
    })
  })

  describe('formatStartDate', () => {
    it('시작 날짜를 올바르게 포맷해야 한다', () => {
      expect(formatStartDate('2024-03-15~2024-04-15')).toBe('2024년 3월 15일')
    })

    it('잘못된 날짜 형식을 처리해야 한다', () => {
      expect(formatStartDate('invalid-date~end')).toBe('유효하지 않은 날짜')
    })

    it('잘못된 입력을 우아하게 처리해야 한다', () => {
      expect(formatStartDate('')).toBe('유효하지 않은 날짜')
    })
  })

  describe('formatLessonTime', () => {
    it('알려진 요일 라벨로 수업 시간을 포맷해야 한다', () => {
      expect(formatLessonTime('2024-03-15~2024-04-15 mon-wed 09:00-10:00')).toBe('월, 수 09:00-10:00')
      expect(formatLessonTime('2024-03-15~2024-04-15 tue-thu 14:00-16:00')).toBe('화, 목 14:00-16:00')
      expect(formatLessonTime('2024-03-15~2024-04-15 weekend 10:00-12:00')).toBe('토, 일 10:00-12:00')
    })

    it('알 수 없는 요일 라벨을 처리해야 한다', () => {
      expect(formatLessonTime('2024-03-15~2024-04-15 custom-day 09:00-10:00')).toBe('custom-day 09:00-10:00')
    })

    it('잘못된 형식을 처리해야 한다', () => {
      expect(formatLessonTime('invalid format')).toBe('유효하지 않은 형식')
      expect(formatLessonTime('')).toBe('유효하지 않은 형식')
    })
  })

  describe('calculateDurationInWeeks', () => {
    it('주 단위로 기간을 계산해야 한다', () => {
      expect(calculateDurationInWeeks('2024-03-01~2024-03-15 mon-wed 09:00-10:00')).toBe('2주')
      expect(calculateDurationInWeeks('2024-03-01~2024-03-29 tue-thu 14:00-16:00')).toBe('4주')
    })

    it('잘못된 날짜를 처리해야 한다', () => {
      expect(calculateDurationInWeeks('invalid~date mon-wed 09:00-10:00')).toBe('기간 계산 불가')
    })

    it('잘못된 입력을 처리해야 한다', () => {
      expect(calculateDurationInWeeks('')).toBe('기간 계산 불가')
    })
  })

  describe('formatPhone', () => {
    it('전화번호를 올바르게 포맷해야 한다', () => {
      expect(formatPhone('01012345678')).toBe('010-1234-5678')
      expect(formatPhone('021234567')).toBe('021-2345-67')
    })

    it('부분 전화번호를 처리해야 한다', () => {
      expect(formatPhone('010')).toBe('010')
      expect(formatPhone('0101234')).toBe('010-1234')
    })

    it('숫자가 아닌 문자를 제거해야 한다', () => {
      expect(formatPhone('010-1234-5678')).toBe('010-1234-5678')
      expect(formatPhone('010abc1234def5678')).toBe('010-1234-5678')
    })

    it('11자리로 제한해야 한다', () => {
      expect(formatPhone('01012345678901')).toBe('010-1234-5678')
    })
  })

  describe('formatDateToISO', () => {
    it('날짜 문자열을 ISO 형식으로 포맷해야 한다', () => {
      expect(formatDateToISO('20240315')).toBe('2024-03-15')
      expect(formatDateToISO('20231225')).toBe('2023-12-25')
    })

    it('잘못된 입력에 대해 빈 문자열을 반환해야 한다', () => {
      expect(formatDateToISO('')).toBe('')
      expect(formatDateToISO('123')).toBe('')
      expect(formatDateToISO('123456789')).toBe('')
    })
  })

  describe('formatDateFromISO', () => {
    it('숫자가 아닌 문자를 제거해야 한다', () => {
      expect(formatDateFromISO('2024-03-15')).toBe('20240315')
      expect(formatDateFromISO('2023-12-25')).toBe('20231225')
    })

    it('다양한 구분자가 있는 문자열을 처리해야 한다', () => {
      expect(formatDateFromISO('2024/03/15')).toBe('20240315')
      expect(formatDateFromISO('2024.03.15')).toBe('20240315')
    })
  })
})