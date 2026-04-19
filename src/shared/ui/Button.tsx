import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

type ButtonVariant = 'primary' | 'subtle' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  subtle: 'bg-light-gray text-text-secondary hover:bg-[#E6E9ED]',
  outline:
    'border border-text-subtitle bg-white text-text-subtitle hover:bg-light-gray/40',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-[10px] py-[5px] text-body2',
  md: 'h-12 min-w-[115px] px-5 py-[13px] text-caption',
  lg: 'h-12 min-w-[240px] px-5 py-[13px] text-caption',
};

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-lg font-medium transition-colors',
        variantClass[variant],
        sizeClass[size],
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
