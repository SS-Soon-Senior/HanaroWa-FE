import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <g
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      clipPath='url(#ic-send_svg__a)'
    >
      <path d='M12.114 18.072a.417.417 0 0 0 .78-.02l5.417-15.834a.413.413 0 0 0-.53-.529L1.95 7.106a.417.417 0 0 0-.02.78l6.608 2.65a1.67 1.67 0 0 1 .926.926zM18.212 1.79l-9.117 9.115' />
    </g>
    <defs>
      <clipPath id='ic-send_svg__a'>
        <path fill='#fff' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcSend;
