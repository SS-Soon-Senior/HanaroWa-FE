import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={15}
    height={14}
    fill='none'
    {...props}
  >
    <path
      fill='#535353'
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M1 7C1 3.427 3.813.5 7.321.5c1.81 0 3.438.782 4.587 2.028l1.077-1.11A.591.591 0 0 1 14 1.829v2.955a.59.59 0 0 1-.59.59h-2.866a.591.591 0 0 1-.424-1.002l.963-.993C10.142 2.332 8.803 1.68 7.32 1.68 4.5 1.681 2.181 4.045 2.181 7s2.319 5.319 5.14 5.319c2.265 0 4.203-1.521 4.882-3.652a.591.591 0 0 1 1.126.36c-.825 2.587-3.194 4.473-6.008 4.473C3.813 13.5 1 10.573 1 7'
    />
  </svg>
);
export default SvgIcRefresh;
