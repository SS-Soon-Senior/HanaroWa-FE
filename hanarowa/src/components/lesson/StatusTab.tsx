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

const StatusTab = ({ tabs, activeTab, onTabChange }: TabbarProps) => {
  return (
    <div className='flex w-full rounded-[1rem] bg-white p-4'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`font-bold-20 focus-visible:ring-main focus-visible:ring-opacity-75 relative flex flex-1 items-center justify-center rounded-[1rem] px-4 py-[1.1rem] whitespace-pre duration-200 focus:outline-none focus-visible:ring-2 ${activeTab === tab.key ? 'text-white' : 'text-black'} `}
        >
          {activeTab === tab.key && (
            <motion.div
              layoutId='tab-pill'
              className='bg-main absolute inset-0 rounded-[1rem]'
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className='fond-bold-18 relative z-10'>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default StatusTab;
