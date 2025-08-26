export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  rightContent?: React.ReactNode;
  containerClassName?: string;
}
