import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='#393939'
      d='M7.79 8h8.42a1.76 1.76 0 0 1 1.59 1 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1a1.76 1.76 0 0 1-2.66 0l-4.21-5.1A2.1 2.1 0 0 1 6.2 9a1.76 1.76 0 0 1 1.59-1'
    />
  </svg>
);
export default SvgIcArrowDown;
