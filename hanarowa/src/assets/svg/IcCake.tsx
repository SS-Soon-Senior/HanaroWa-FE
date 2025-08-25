import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcCake = (props: SVGProps<SVGSVGElement>) => (
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
      d='M3.333 13.75v2.916A1.667 1.667 0 0 0 5 18.334h10a1.666 1.666 0 0 0 1.667-1.666V13.75M2.5 11.666v-.833a1.667 1.667 0 0 1 1.667-1.667h11.666a1.666 1.666 0 0 1 1.667 1.667v.833m-7.5-5v2.5m0-2.5c1.052 0 1.667-.806 1.667-2.187S10 1.667 10 1.667 8.333 3.098 8.333 4.479 8.948 6.667 10 6.667'
    />
    <path
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.313}
      d='M2.5 11.667a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0'
    />
  </svg>
);
export default SvgIcCake;
