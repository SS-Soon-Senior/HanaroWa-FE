import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcStarEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      stroke='#AAA'
      strokeLinejoin='round'
      d='M11.532 3.673a.5.5 0 0 1 .936 0l1.82 4.853c.22.586.78.974 1.405.974h4.545a.5.5 0 0 1 .32.884l-3.41 2.842a1.5 1.5 0 0 0-.503 1.477l1.301 5.858a.5.5 0 0 1-.779.515l-4.295-3.067a1.5 1.5 0 0 0-1.744 0l-4.295 3.067a.5.5 0 0 1-.78-.515l1.302-5.858a1.5 1.5 0 0 0-.503-1.477l-3.41-2.842a.5.5 0 0 1 .32-.884h4.545c.625 0 1.185-.388 1.405-.974z'
    />
  </svg>
);
export default SvgIcStarEmpty;
