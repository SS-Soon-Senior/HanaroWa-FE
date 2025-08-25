import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcUp = (props: SVGProps<SVGSVGElement>) => (
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
      d='M16 7.5h6v6'
    />
    <path
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      d='M22 7.5 13.5 16l-5-5L2 17.5'
    />
  </svg>
);
export default SvgIcUp;
