'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { IconButton } from '../atoms';

export interface MenuItem {
  icon?: ReactNode;
  title: string;
  href?: string;
  children?: ReactNode;
}

interface MenuSectionProps {
  title?: string;
  items: MenuItem[];
  className?: string;
}

const MenuSection = ({ title, items, className }: MenuSectionProps) => {
  const router = useRouter();

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <section className={`my-[2rem] ${className}`}>
      {title && (
        <h2 className='font-bold-22 text-center text-black'>{title}</h2>
      )}
      <div className={`mt-[1.2rem] flex flex-row justify-center gap-[2rem]`}>
        {items.map((item) => (
          <IconButton
            key={typeof item.href === 'string' ? item.href : item.title}
            icon={item.icon}
            title={item.title}
            onClick={() => handleClick(item.href)}
          >
            {item.children}
          </IconButton>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
