import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.313}
      d='m6 14.738 4.37-4.369 4.368 4.37m0-8.739-4.37 4.37L6 6'
    />
  </svg>
);
export default SvgIcX;
