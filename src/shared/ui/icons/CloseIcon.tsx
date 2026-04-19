import type { IconProps } from './types';

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M14.6582 4.16669L9.99984 8.82502L5.3415 4.16669L4.1665 5.34169L8.82484 10L4.1665 14.6584L5.3415 15.8334L9.99984 11.175L14.6582 15.8334L15.8332 14.6584L11.1748 10L15.8332 5.34169L14.6582 4.16669Z"
        fill="currentColor"
      />
    </svg>
  );
}
