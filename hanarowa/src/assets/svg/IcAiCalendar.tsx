import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcAiCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={21}
    fill='none'
    {...props}
  >
    <path d='M20 20.5H0V.5h20z' />
    <path
      stroke='#6B7280'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='M6.667 2.167V5.5M13.334 2.167V5.5M15.833 3.833H4.167c-.92 0-1.667.747-1.667 1.667v11.667c0 .92.746 1.666 1.667 1.666h11.666c.92 0 1.667-.746 1.667-1.666V5.5c0-.92-.746-1.667-1.667-1.667M2.5 8.833h15'
    />
  </svg>
);
export default SvgIcAiCalendar;
