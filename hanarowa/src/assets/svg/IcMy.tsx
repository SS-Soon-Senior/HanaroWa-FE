import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcMy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={28}
    height={28}
    fill='none'
    {...props}
  >
    <path d='M28 28H0V0h28z' />
    <path
      stroke='#9CA3AF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.333}
      d='M22.167 24.5v-2.333A4.667 4.667 0 0 0 17.5 17.5h-7a4.667 4.667 0 0 0-4.667 4.667V24.5M14 12.833A4.667 4.667 0 1 0 14 3.5a4.667 4.667 0 0 0 0 9.333'
    />
  </svg>
);
export default SvgIcMy;
