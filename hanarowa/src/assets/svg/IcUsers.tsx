import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20' // 뷰박스 추가 (20x20 크기 기준)
    fill='none'
    {...props}
  >
    {/* 뷰박스에 맞는 SVG 경로만 남김 */}
    <g
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
    >
      <path d='M13.333 17.5v-1.667A3.333 3.333 0 0 0 10 12.5H5a3.333 3.333 0 0 0-3.333 3.333V17.5M13.333 2.607a3.334 3.334 0 0 1 0 6.453M18.333 17.5v-1.667a3.33 3.33 0 0 0-2.5-3.225M7.5 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667' />
    </g>
  </svg>
);
export default SvgIcUsers;
