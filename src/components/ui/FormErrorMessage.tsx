interface IFormErrorMessageProps {
  message: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
}

export default function FormErrorMessage({ message, size = 'md', align = 'center' }: IFormErrorMessageProps) {
  function getTextSize() {
    if (size === 'sm') return 'text-sm';
    if (size === 'md') return 'text-base';
    if (size === 'lg') return 'text-lg';
  }

  return <div className={`text-red-500 w-full ${align === 'center' ? 'text-center' : 'text-left'} ${getTextSize()}`}>{message}</div>
}

