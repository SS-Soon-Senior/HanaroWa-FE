export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  id?: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  labelClassName?: string; // 선택/플레이스홀더 공통 텍스트 스타일
  placeholderClassName?: string; // 플레이스홀더일 때만 추가할 스타일
}
