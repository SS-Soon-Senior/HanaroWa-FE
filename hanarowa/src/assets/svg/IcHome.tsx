import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={28}
    height={28}
    fill='none'
    {...props}
  >
    <path stroke='#9CA3AF' d='M28 28H0V0h28z' />
    <path
      stroke='#9CA3AF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.333}
      d='M17.5 24.5v-9.333A1.167 1.167 0 0 0 16.333 14h-4.666a1.167 1.167 0 0 0-1.167 1.167V24.5'
    />
    <path
      stroke='#9CA3AF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.333}
      d='M3.5 11.667a2.33 2.33 0 0 1 .827-1.783l8.167-6.999a2.334 2.334 0 0 1 3.012 0l8.167 6.999a2.33 2.33 0 0 1 .827 1.783v10.5a2.333 2.333 0 0 1-2.333 2.333H5.833A2.333 2.333 0 0 1 3.5 22.167z'
    />
  </svg>
);
export default SvgIcHome;
