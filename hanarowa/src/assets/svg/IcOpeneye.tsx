import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcOpeneye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={24}
    fill='none'
    {...props}
  >
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3.93 10.529 1.144 7.737m8.093-.633L8.1 3.429m13.111 7.1L24 7.739m-8.093-.635 1.135-3.675m-4.47 3.187c-7.49 0-10.634 6.735-10.634 6.875s3.145 6.873 10.633 6.873c7.489 0 10.633-6.734 10.633-6.873S20.06 6.616 12.57 6.616'
    />
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9.541 12.797a3.108 3.108 0 1 0 6.06 1.388 3.108 3.108 0 1 0-6.06-1.388'
    />
  </svg>
);
export default SvgIcOpeneye;
