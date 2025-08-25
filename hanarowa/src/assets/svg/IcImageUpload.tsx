import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcImageUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={15}
    height={14}
    fill='none'
    {...props}
  >
    <path
      fill='#9CA3AF'
      d='M7 10.577v-8.65l-2.33 2.33-.708-.718L7.5 0l3.539 3.539-.708.719L8 1.927v8.65zM2.116 14q-.69 0-1.153-.462-.462-.462-.463-1.154V9.961h1v2.423q0 .23.192.424a.58.58 0 0 0 .423.192h10.77a.6.6 0 0 0 .423-.192.58.58 0 0 0 .192-.424V9.961h1v2.423q0 .69-.462 1.153-.462.462-1.154.463z'
    />
  </svg>
);
export default SvgIcImageUpload;
