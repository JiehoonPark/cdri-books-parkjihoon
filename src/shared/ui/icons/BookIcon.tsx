import type { IconProps } from './types';

export function BookIcon({ size = 80, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle cx="40" cy="40" r="40" fill="#87C7D0" />
      <rect x="24" y="26" width="32" height="32" rx="2" fill="#FFE180" />
      <path d="M40 26V58" stroke="#C89B2A" strokeWidth="1.5" />
      <path
        d="M28 32H36M28 38H36M44 32H52M44 38H52"
        stroke="#C89B2A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
