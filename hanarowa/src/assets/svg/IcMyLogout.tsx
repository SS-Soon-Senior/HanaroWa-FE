import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcMyLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={26}
    height={26}
    fill='none'
    {...props}
  >
    <path
      stroke='#4B5259'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 13h12m0 0-5-5m5 5-5 5M14 4H8a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h6'
    />
  </svg>
);
export default SvgIcMyLogout;
