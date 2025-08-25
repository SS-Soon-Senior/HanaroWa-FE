import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcUser = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.667}
      d='M15.833 17.5v-1.667A3.333 3.333 0 0 0 12.5 12.5h-5a3.333 3.333 0 0 0-3.333 3.333V17.5M10 9.167A3.333 3.333 0 1 0 10 2.5a3.333 3.333 0 0 0 0 6.667'
    />
  </svg>
);
export default SvgIcUser;
