import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcHeaderArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    {...props}
  >
    <path
      stroke='#141415'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 16H5M11 10l-6 6 6 6'
    />
  </svg>
);
export default SvgIcHeaderArrow;
