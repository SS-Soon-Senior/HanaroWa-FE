import { BranchProvider } from '@contexts';
import { ReactNode } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <BranchProvider>{children}</BranchProvider>;
};

export default Layout;
