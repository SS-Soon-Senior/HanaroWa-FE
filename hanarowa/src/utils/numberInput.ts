import React from 'react';

// 숫자 키 입력만 허용하는 keydown 핸들러
export const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/[0-9]/.test(e.key) &&
    ![
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ].includes(e.key)
  ) {
    e.preventDefault();
  }
};

// 한글 및 특수문자 입력 방지하는 input 핸들러
export const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/[^0-9]/g, '');
};

// 숫자만 허용하는 onChange 핸들러 생성 함수
export const createNumberChangeHandler = (
  field: string,
  handleInputChange: (field: string, value: string) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      handleInputChange(field, value);
    }
  };
};