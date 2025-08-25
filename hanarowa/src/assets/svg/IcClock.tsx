import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={25}
    fill='none'
    {...props}
  >
    <path d='M24 24.5H0V.5h24z' />
    <path
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      d='M12 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10'
    />
    <path
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      d='M12 6.5v6l4 2'
    />
  </svg>
);
export default SvgIcClock;
