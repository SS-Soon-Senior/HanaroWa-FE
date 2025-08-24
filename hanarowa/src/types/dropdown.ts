export interface DropdownOption {
  value: string;
  label: string;
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
}
