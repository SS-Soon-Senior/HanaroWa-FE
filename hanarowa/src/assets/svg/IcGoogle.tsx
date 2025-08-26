import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcGoogle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={24}
    fill='none'
    {...props}
  >
    <mask
      id='ic-google_svg__a'
      width={21}
      height={20}
      x={2}
      y={2}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill='#fff' d='M22.5 2h-20v20h20z' />
    </mask>
    <g mask='url(#ic-google_svg__a)'>
      <path
        fill='#4285F4'
        d='M22.1 12.227c0-.709-.064-1.39-.182-2.045H12.5v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35'
      />
      <path
        fill='#34A853'
        d='M12.5 22c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.604 0-4.809-1.76-5.595-4.123H3.564v2.59A10 10 0 0 0 12.5 22'
      />
      <path
        fill='#FBBC04'
        d='M6.905 13.9c-.2-.6-.314-1.24-.314-1.9s.114-1.3.313-1.9V7.51h-3.34A10 10 0 0 0 2.5 12c0 1.614.386 3.141 1.064 4.491z'
      />
      <path
        fill='#E94235'
        d='M12.5 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C17.459 2.99 15.196 2 12.501 2 8.59 2 5.208 4.24 3.563 7.51l3.34 2.59c.787-2.364 2.992-4.123 5.596-4.123'
      />
    </g>
  </svg>
);
export default SvgIcGoogle;
