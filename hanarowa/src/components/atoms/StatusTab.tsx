import { motion } from 'framer-motion';
import React from 'react';

export interface Tab {
  key: string;
  label: string;
}
interface TabbarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const Tabbar: React.FC<TabbarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='flex py-[0.5rem] px-[0.4rem] bg-white rounded-[1rem]'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            relative flex-1 py-[1.1rem] px-[6.15rem] justify-center items-center rounded-[1rem] duration-200 font-bold-20
            focus:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-opacity-75
            ${activeTab === tab.key ? 'text-white' : 'text-black'}
          `}
        >
          {activeTab === tab.key && (
            <motion.div
              layoutId='tab-pill'
              className='absolute inset-0 bg-main rounded-[1rem]'
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className='relative z-10'>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabbar;
