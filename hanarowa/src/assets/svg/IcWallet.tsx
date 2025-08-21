import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={34}
    height={34}
    fill='none'
    {...props}
  >
    <path
      stroke='#3B82F6'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='M26.917 9.917v-4.25A1.417 1.417 0 0 0 25.5 4.25H7.083a2.833 2.833 0 0 0 0 5.667h21.25a1.417 1.417 0 0 1 1.417 1.416V17m0 0H25.5a2.833 2.833 0 0 0 0 5.667h4.25a1.416 1.416 0 0 0 1.417-1.417v-2.833A1.417 1.417 0 0 0 29.75 17'
    />
    <path
      stroke='#3B82F6'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
      d='M4.25 7.083v19.834a2.833 2.833 0 0 0 2.833 2.833h21.25a1.417 1.417 0 0 0 1.417-1.417v-5.666'
    />
  </svg>
);
export default SvgIcWallet;
