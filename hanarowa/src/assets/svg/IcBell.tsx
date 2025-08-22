import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    fill='none'
    {...props}
  >
    <path
      stroke='#F14A76'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3.5}
      d='M15.402 31.5a3 3 0 0 0 5.196 0'
    />
    <path
      stroke='#F14A76'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='M4.893 22.989A1.5 1.5 0 0 0 6 25.5h24a1.5 1.5 0 0 0 1.11-2.51C29.115 20.935 27 18.75 27 12a9 9 0 1 0-18 0c0 6.749-2.117 8.934-4.107 10.989'
    />
  </svg>
);
export default SvgIcBell;
