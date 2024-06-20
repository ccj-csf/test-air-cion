'use client';

import { BaseEmpty, SkeletonList } from '@/components';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';

export interface ICityItem {
  city: string;
  totalUsers: number;
  totalScore: number;
}

// 修改组件以接受 items 属性
interface CityProps {
  items: ICityItem[];
  loading: boolean;
}

const CityList: React.FC<CityProps> = ({ items, loading }) => {
  if (items?.length === 0 && loading) {
    return (
      <div>
        <SkeletonList color="bg-gray-200" />
      </div>
    );
  }
  return (
    <main className=" space-y-6 rounded-14  px-4 py-5">
      {items?.length > 0 && !loading ? (
        items?.map((item, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            {/* 根据索引动态显示图标 */}
            {index < 3 ? (
              <Image
                src={`/icons/${`no${index + 1}`}.svg`}
                alt={`icon-${index + 1}`}
                width={32}
                height={32}
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center text-12">{index + 1}</span>
            )}

            <section className="flex   w-full items-center justify-between">
              <div className="font-500 flex  w-full flex-col space-y-2">
                <span className="font-500 text-14">{item.city}</span>
                <span className="text-12 text-gray-100">
                  {formatNumberWithCommas(item.totalUsers)} Users
                </span>
              </div>
              <span className=" font-500 text-16">{formatNumberWithCommas(item.totalScore)}</span>
            </section>
          </div>
        ))
      ) : (
        <BaseEmpty></BaseEmpty>
      )}
    </main>
  );
};

export default CityList;
