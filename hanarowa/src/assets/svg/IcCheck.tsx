import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={150}
    height={150}
    fill='none'
    {...props}
  >
    <path
      fill='#00A49D'
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={6}
      d='M41.701 61.156a16.37 16.37 0 0 1 4.415-15.131A16.36 16.36 0 0 1 61.25 41.64a16.36 16.36 0 0 1 13.782-7.55 16.35 16.35 0 0 1 13.782 7.55 16.35 16.35 0 0 1 15.156 4.395 16.374 16.374 0 0 1 4.393 15.162 16.368 16.368 0 0 1 0 27.575 16.38 16.38 0 0 1-4.383 15.139 16.36 16.36 0 0 1-15.125 4.417 16.36 16.36 0 0 1-13.803 7.581 16.36 16.36 0 0 1-13.802-7.581 16.356 16.356 0 0 1-19.282-11.383 16.4 16.4 0 0 1-.267-8.133 16.36 16.36 0 0 1-7.61-13.828 16.37 16.37 0 0 1 7.61-13.828'
    />
    <path
      stroke='#F8FAFC'
      strokeLinecap='round'
      strokeWidth={6.818}
      d='M57.955 75 71.59 88.636l23.864-23.863'
    />
  </svg>
);
export default SvgIcCheck;
