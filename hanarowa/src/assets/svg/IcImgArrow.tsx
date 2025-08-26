import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcImgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={27}
    height={27}
    fill='none'
    {...props}
  >
    <path
      fill='#fff'
      d='M8.654 2.675a1.635 1.635 0 0 0 0 2.312l8.093 8.093-8.093 8.093a1.635 1.635 0 0 0 2.312 2.312l9.249-9.25a1.635 1.635 0 0 0 0-2.311l-9.25-9.25a1.635 1.635 0 0 0-2.311 0'
    />
  </svg>
);
export default SvgIcImgArrow;
