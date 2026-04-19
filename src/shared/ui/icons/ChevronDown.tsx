import type { IconProps } from './types';

export function ChevronDown({ size = 14, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={(Number(size) * 8) / 14}
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
