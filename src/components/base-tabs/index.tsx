'use client';
import React, { useEffect, useState } from 'react';

interface TabPane {
  key: string;
  label: string;
  component: React.ReactNode;
  underlineWidth?: string; // 可选属性，定义下划线的宽度
}

interface TabsProps {
  activeKey: string;
  tabs: TabPane[];
  onChange: (key: string) => void;
}

const BaseTabs: React.FC<TabsProps> = ({ activeKey, tabs, onChange }) => {
  const [currentActiveKey, setCurrentActiveKey] = useState(activeKey);

  useEffect(() => {
    setCurrentActiveKey(activeKey);
  }, [activeKey]);

  const handleTabClick = (key: string) => {
    setCurrentActiveKey(key);
    onChange(key);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full ">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 px-4 py-2 text-center text-sm font-medium transition-colors duration-300 ease-in-out
              ${currentActiveKey === tab.key ? 'border-white text-white' : 'text-gray-100 hover:text-white'}`}
            style={{
              borderBottomWidth: currentActiveKey === tab.key ? tab.underlineWidth || '2px' : '0px',
            }}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content mt-2">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`transition-opacity duration-500 ease-in-out
              ${currentActiveKey === tab.key ? 'opacity-100' : 'h-0 overflow-hidden opacity-0'}`}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export { BaseTabs };
