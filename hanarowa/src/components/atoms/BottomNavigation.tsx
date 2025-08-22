'use client';

import { IcAi, IcHome, IcHomeActive, IcMy, IcMyActive } from '@svg';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BottomNavigation = ({ selectedItem }: { selectedItem?: string }) => {
  const handleClick = (path: string) => {
    router.push(path);
  };

  const navigationItems = [
    {
      name: 'home',
      title: '홈',
      icon: <IcHome />,
      activeIcon: <IcHomeActive onClick={() => handleClick('/')} />,
    },
    {
      name: 'ai',
      title: 'AI 상담',
      icon: <IcAi />,
    },
    {
      name: 'my',
      title: '마이',
      icon: <IcMy />,
      activeIcon: <IcMyActive onClick={() => handleClick('/my')} />,
    },
  ];

  const [selected, setSelected] = useState(
    selectedItem || navigationItems[0].name
  );

  const router = useRouter();

  const handleNavigation = (name: string) => {
    setSelected(name);
    if (name === 'home') {
      router.push('/');
      return;
    }
    router.push(`/${name}`);
  };

  return (
    <div className='fixed right-0 bottom-0 left-0 z-40 mx-auto flex h-[10.5rem] max-w-[768px] items-center justify-around rounded-tl-[4rem] rounded-tr-[4rem] bg-white px-[2rem] py-[1rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.1)]'>
      {navigationItems.map((item, index) => (
        <button
          key={item.name}
          className={clsx(
            `flex h-full flex-col items-center justify-center ${
              selected === item.name ? 'text-main' : 'text-gray3af'
            }`,
            {
              'gap-0': index === 1,
              'gap-[1rem]': index !== 1,
            }
          )}
          onClick={() => handleNavigation(item.name)}
        >
          {selected === item.name ? item.activeIcon || item.icon : item.icon}
          <span className={clsx(index === 1 ? 'font-bold-20' : 'font-bold-22')}>
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
