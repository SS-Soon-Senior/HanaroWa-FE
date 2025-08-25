import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcDownChevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path d='M20 20H0V0h20z' />
    <path
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='m5 7.5 5 5 5-5'
    />
  </svg>
);
export default SvgIcDownChevron;
