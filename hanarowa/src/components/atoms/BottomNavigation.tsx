'use client';

import { IcAi, IcHome, IcHomeActive, IcMy, IcMyActive } from '@svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BottomNavigation({
  selectedItem,
}: {
  selectedItem?: string;
}) {
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
    <div className='bg-white flex items-center justify-around'>
      {navigationItems.map((item) => (
        <button
          key={item.name}
          className={`flex flex-col items-center ${
            selected === item.name ? 'text-main' : 'text-gray3af'
          }`}
          onClick={() => handleNavigation(item.name)}
        >
          {selected === item.name ? item.activeIcon || item.icon : item.icon}
          <span className='text-xs'>{item.title}</span>
        </button>
      ))}
    </div>
  );
}
