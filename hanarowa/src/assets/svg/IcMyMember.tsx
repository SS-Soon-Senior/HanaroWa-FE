import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcMyMember = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={26}
    height={26}
    fill='none'
    {...props}
  >
    <path
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13 3.25H5.417A2.167 2.167 0 0 0 3.25 5.417v15.166a2.167 2.167 0 0 0 2.167 2.167h15.166a2.167 2.167 0 0 0 2.167-2.167V13'
    />
    <path
      stroke='#535353'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19.906 2.844a2.298 2.298 0 0 1 3.25 3.25l-9.764 9.765a2.17 2.17 0 0 1-.924.547l-3.113.91a.542.542 0 0 1-.671-.672l.91-3.112c.102-.349.29-.666.548-.923z'
    />
  </svg>
);
export default SvgIcMyMember;
