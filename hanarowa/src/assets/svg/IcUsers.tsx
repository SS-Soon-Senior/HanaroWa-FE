import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path fill='#F5F5F5' d='M0 0h20v20H0z' />
    <path
      fill='#E1E1E1'
      d='M-1926-5066c0-1.1.9-2 2-2h13302c1.1 0 2 .9 2 2V5390c0 1.1-.9 2-2 2H-1924c-1.1 0-2-.9-2-2z'
    />
    <path
      fill='#000'
      fillOpacity={0.1}
      d='M-1924-5068v1h13302v-2H-1924zm13304 2h-1V5390h2V-5066zm-2 10458v-1H-1924v2h13302zm-13304-2h1V-5066h-2V5390zm2 2v-1c-.55 0-1-.45-1-1h-2c0 1.66 1.34 3 3 3zm13304-2h-1c0 .55-.4 1-1 1v2c1.7 0 3-1.34 3-3zm-2-10458v1c.6 0 1 .45 1 1h2c0-1.66-1.3-3-3-3zm-13302 0v-1c-1.66 0-3 1.34-3 3h2c0-.55.45-1 1-1z'
    />
    <g clipPath='url(#ic-users_svg__a)'>
      <path fill='#F8FAFC' d='M-200-344h375v812h-375z' />
      <g
        stroke='#00A49D'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.667}
      >
        <path d='M13.333 17.5v-1.667A3.333 3.333 0 0 0 10 12.5H5a3.333 3.333 0 0 0-3.333 3.333V17.5M13.333 2.607a3.334 3.334 0 0 1 0 6.453M18.333 17.5v-1.667a3.33 3.33 0 0 0-2.5-3.225M7.5 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667' />
      </g>
    </g>
    <defs>
      <clipPath id='ic-users_svg__a'>
        <path fill='#fff' d='M-200-344h375v812h-375z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcUsers;
