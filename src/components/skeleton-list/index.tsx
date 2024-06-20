'use client';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface SkeletonListProps {
  count?: number; // 定义一个属性来指定显示多少个骨架屏
  color?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count = 10, color = 'bg-gray-500' }) => {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }, (_, index) => (
        <div className="flex items-center space-x-4" key={index}>
          <Skeleton className={`h-12 w-12 rounded-full ${color}`} />
          <div className="space-y-2">
            <Skeleton className={`h-4 w-[250px] ${color}`} />
            <Skeleton className={`h-4 w-[200px] ${color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
