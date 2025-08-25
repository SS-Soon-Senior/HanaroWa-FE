import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcLocation = (props: SVGProps<SVGSVGElement>) => (
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
      d='M16.667 8.333c0 4.161-4.616 8.494-6.166 9.833a.834.834 0 0 1-1.002 0c-1.55-1.339-6.166-5.672-6.166-9.833a6.667 6.667 0 0 1 13.334 0'
    />
    <path
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='M10 10.834a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'
    />
  </svg>
);
export default SvgIcLocation;
