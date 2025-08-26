import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcPhone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <g clipPath='url(#ic-phone_svg__a)'>
      <path
        stroke='#535353'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11.527 13.807a.834.834 0 0 0 1.01-.253l.296-.388a1.67 1.67 0 0 1 1.334-.666h2.5a1.667 1.667 0 0 1 1.666 1.666v2.5a1.667 1.667 0 0 1-1.666 1.667 15 15 0 0 1-15-15 1.667 1.667 0 0 1 1.666-1.666h2.5A1.667 1.667 0 0 1 7.5 3.333v2.5a1.67 1.67 0 0 1-.667 1.334l-.39.292A.83.83 0 0 0 6.2 8.486a11.67 11.67 0 0 0 5.327 5.32'
      />
    </g>
    <defs>
      <clipPath id='ic-phone_svg__a'>
        <path fill='#fff' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcPhone;
