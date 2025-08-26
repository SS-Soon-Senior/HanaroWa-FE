import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcBlackcalendar = (props: SVGProps<SVGSVGElement>) => (
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
      d='M6.667 1.667V5M13.334 1.667V5M15.833 3.333H4.167C3.247 3.333 2.5 4.08 2.5 5v11.667c0 .92.746 1.666 1.667 1.666h11.666c.92 0 1.667-.746 1.667-1.666V5c0-.92-.746-1.667-1.667-1.667M2.5 8.333h15'
    />
  </svg>
);
export default SvgIcBlackcalendar;
