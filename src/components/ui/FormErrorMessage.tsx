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

  function getTextAlign() {
    if (align === 'center') return 'text-center';
    if (align === 'left') return 'px-2 text-left';
  }

  return <div className={`text-red-500 w-full -mt-1 ${getTextAlign()} ${getTextSize()}`}>{message}</div>
}

