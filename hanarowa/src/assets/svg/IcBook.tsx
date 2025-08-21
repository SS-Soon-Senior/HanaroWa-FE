import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcBook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    fill='none'
    {...props}
  >
    <path
      stroke='#6A9BEE'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='M18 10.5v21M4.5 27A1.5 1.5 0 0 1 3 25.5V6a1.5 1.5 0 0 1 1.5-1.5H12a6 6 0 0 1 6 6 6 6 0 0 1 6-6h7.5A1.5 1.5 0 0 1 33 6v19.5a1.5 1.5 0 0 1-1.5 1.5h-9a4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z'
    />
  </svg>
);
export default SvgIcBook;
