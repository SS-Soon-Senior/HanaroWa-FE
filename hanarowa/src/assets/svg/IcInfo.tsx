import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <g
      stroke='#EA580C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      clipPath='url(#ic-Info_svg__a)'
    >
      <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10M12 16v-4M12 8h.01' />
    </g>
    <defs>
      <clipPath id='ic-Info_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcInfo;
