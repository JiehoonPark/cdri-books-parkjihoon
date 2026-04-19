import type { IconProps } from './types';

export function HeartFilled({ size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={(Number(size) * 20) / 22}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 6.5C0 2.91017 2.91015 0 6.5 0C8.24701 0 9.83288 0.689818 11 1.80968C12.1671 0.689818 13.753 0 15.5 0C19.0898 0 22 2.91017 22 6.5C22 9.63412 20.164 12.4994 18.0231 14.6615C15.8724 16.8335 13.2421 18.4718 11.3154 19.1121C11.1106 19.1801 10.8894 19.1801 10.6846 19.1121C8.75788 18.4718 6.12761 16.8335 3.97692 14.6615C1.83596 12.4994 0 9.63412 0 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
