import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    fill='none'
    {...props}
  >
    <path
      stroke='#ADA9E7'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='m31.5 31.5-6.51-6.51M16.5 28.5c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12'
    />
  </svg>
);
export default SvgIcSearch;
