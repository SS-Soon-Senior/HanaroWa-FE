import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    fill='none'
    {...props}
  >
    <path
      stroke='#00BBA0'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='M12 3v6M24 3v6M28.5 6h-21a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3M4.5 15h27'
    />
  </svg>
);
export default SvgIcCalendar;
