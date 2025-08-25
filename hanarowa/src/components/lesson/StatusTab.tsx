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

const StatusTab: React.FC<TabbarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='flex rounded-[1rem] bg-white px-[0.4rem] py-[0.5rem]'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`font-bold-20 focus-visible:ring-main focus-visible:ring-opacity-75 relative flex-1 items-center justify-center rounded-[1rem] px-[6.15rem] py-[1.1rem] duration-200 focus:outline-none focus-visible:ring-2 ${activeTab === tab.key ? 'text-white' : 'text-black'} `}
        >
          {activeTab === tab.key && (
            <motion.div
              layoutId='tab-pill'
              className='bg-main absolute inset-0 rounded-[1rem]'
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className='relative z-10'>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default StatusTab;
