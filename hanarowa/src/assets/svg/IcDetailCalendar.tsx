import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcDetailCalendar = (props: SVGProps<SVGSVGElement>) => (
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
      d='M8 2.5v4M16 2.5v4M19 4.5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-14a2 2 0 0 0-2-2M3 10.5h18'
    />
  </svg>
);
export default SvgIcDetailCalendar;
