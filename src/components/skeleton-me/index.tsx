'use client';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface SkeletonMeProps {
  count?: number; // 定义一个属性来指定显示多少个骨架屏
  color?: string;
}

const SkeletonMe: React.FC<SkeletonMeProps> = ({ count = 10, color = 'bg-gray-500' }) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <Skeleton className={`h-16 w-16 rounded-full ${color}`} />
        </div>
        <div className=" space-y-2">
          <Skeleton className={`h-5 w-[200px] ${color}`} />
          <Skeleton className={`h-5 w-[200px] ${color}`} />
        </div>
      </div>
      <Skeleton className={`h-12 w-full ${color}`} />
      <Skeleton className={`h-[85px] w-full ${color}`} />
      <Skeleton className={`h-[95px] w-full ${color}`} />
      <div>
        <Skeleton className={`h-[27px] w-[272px] ${color}`} />
        <Skeleton className={`mt-4 h-[343px] w-full ${color}`} />
      </div>
    </div>
  );
};

export default SkeletonMe;
