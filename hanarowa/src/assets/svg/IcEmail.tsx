import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcEmail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path
      stroke='#535353'
      d='M17.824 4.866q.009.066.01.134v10c0 .64-.527 1.166-1.167 1.166H3.334c-.64 0-1.167-.525-1.167-1.165V5q0-.069.008-.135l.893.558 6.667 4.167.265.165.265-.165 6.666-4.167zm-1.422 1.377-6.402 4-6.402-4-.764-.478v9.736h14.333V5.764zM3.334 3.833h13.333c.462 0 .863.275 1.051.667H2.282c.189-.392.59-.667 1.052-.667Z'
    />
  </svg>
);
export default SvgIcEmail;
