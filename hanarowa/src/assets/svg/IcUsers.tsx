import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      stroke='#00A49D'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'
    />
  </svg>
);
export default SvgIcUsers;
