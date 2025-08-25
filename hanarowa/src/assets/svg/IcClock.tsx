import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <g
      stroke='#00695C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      clipPath='url(#ic-clock_svg__a)'
    >
      <path d='M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666' />
      <path d='M10 5v5l3.333 1.667' />
    </g>
    <defs>
      <clipPath id='ic-clock_svg__a'>
        <path fill='#fff' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcClock;
