import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcMyUnsub = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={26}
    height={26}
    fill='none'
    {...props}
  >
    <path
      stroke='#4B5259'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M7 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3a1 1 0 0 0-.783.378l-.074.107-1.286 2.142a1 1 0 0 1-1.714 0l-1.286-2.142A1 1 0 0 0 10 19H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z'
    />
    <path
      stroke='#4B5259'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m16 9-6 6M10 9l6 6'
    />
  </svg>
);
export default SvgIcMyUnsub;
