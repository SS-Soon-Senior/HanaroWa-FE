import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcRightChevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    {...props}
  >
    <path d='M16 16H0V0h16z' />
    <path
      stroke='#9CA3AF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.333}
      d='m6 12 4-4-4-4'
    />
  </svg>
);
export default SvgIcRightChevron;
