import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcGoogle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={21}
    height={20}
    fill='none'
    {...props}
  >
    <mask
      id='ic-google_svg__a'
      width={21}
      height={20}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill='#fff' d='M20.5 0H.5v20h20z' />
    </mask>
    <g mask='url(#ic-google_svg__a)'>
      <path
        fill='#4285F4'
        d='M20.1 10.227c0-.709-.064-1.39-.182-2.045H10.5v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35'
      />
      <path
        fill='#34A853'
        d='M10.5 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.604 0-4.809-1.76-5.595-4.123H1.564v2.59A10 10 0 0 0 10.5 20'
      />
      <path
        fill='#FBBC04'
        d='M4.905 11.9c-.2-.6-.314-1.24-.314-1.9s.114-1.3.313-1.9V5.51h-3.34A10 10 0 0 0 .5 10c0 1.614.386 3.141 1.064 4.491z'
      />
      <path
        fill='#E94235'
        d='M10.5 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C15.459.99 13.196 0 10.501 0 6.59 0 3.208 2.24 1.563 5.51l3.34 2.59c.787-2.364 2.992-4.123 5.596-4.123'
      />
    </g>
  </svg>
);
export default SvgIcGoogle;
