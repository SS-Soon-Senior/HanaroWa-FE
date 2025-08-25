import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcAiSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path d='M20 20H0V0h20z' />
    <path
      stroke='#6B7280'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='m17.5 17.5-3.617-3.617M9.167 15.833a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333'
    />
  </svg>
);
export default SvgIcAiSearch;
