'use client';

import { Dropdown } from '@/components/lesson';
import type { DropdownProps } from '@/types/dropdown';
import React from 'react';

export type StatusValue = 'APPROVED' | 'PENDING' | 'REJECTED';

// Dropdown이 기대하는 옵션 타입 그대로 사용
const DEFAULT_OPTIONS: DropdownProps['options'] = [
  { label: '승인', value: 'APPROVED' },
  { label: '대기', value: 'PENDING' },
  { label: '반려', value: 'REJECTED' },
];

export interface StatusDropdownProps
  extends Omit<
    DropdownProps,
    'options' | 'value' | 'onChange' | 'placeholder'
  > {
  value?: StatusValue;
  onChange?: (value: StatusValue) => void;
  placeholder?: string;
  /** ⬅️ 선택형으로! */
  options?: DropdownProps['options'];
}

export default function StatusDropdown({
  value,
  onChange,
  placeholder = '승인',
  options = DEFAULT_OPTIONS,
  ...rest
}: StatusDropdownProps) {
  const [internal, setInternal] = React.useState<StatusValue | undefined>(
    value
  );
  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  const handleChange = (v: string) => {
    const casted = v as StatusValue;
    if (value === undefined) setInternal(casted);
    onChange?.(casted);
  };

  const current = value ?? internal;

  return (
    <Dropdown
      options={options}
      value={current}
      onChange={handleChange}
      placeholder={placeholder}
      className='bg-white px-[1.2rem] py-[0.8rem] text-left'
      {...rest}
    />
  );
}
