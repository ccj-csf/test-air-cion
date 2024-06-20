'use client';

import { BaseEmpty, SkeletonList } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';

// 添加一个接口来定义列表项的数据结构

export interface IRankingUserList {
  username: string;
  imageUrl: string;
  fallbackText: string;
  score: number;
}

// 修改组件以接受 items 属性
interface ListProps {
  items: IRankingUserList[];
  loading: boolean;
}

const RankingUserList: React.FC<ListProps> = ({ items, loading }) => {
  if (items?.length === 0 && loading) {
    return (
      <div>
        <SkeletonList />
      </div>
    );
  }
  return (
    <main className=" space-y-6 rounded-14 bg-gray-400 px-4 py-5">
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

            <Avatar className="h-[44px] w-[44px]">
              <AvatarImage src={item.imageUrl} alt={`@${item.username}`} />
              <AvatarFallback>{item.fallbackText || 'Avatar'}</AvatarFallback>
            </Avatar>
            <section className="flex flex-col justify-center">
              <span className="font-500 text-14">{item.username}</span>
              <div className="flex items-center space-x-2">
                <Image src="/icons/coin1.svg" alt="coin1" width={16} height={22} />
                <span className="text-12 text-gray-100">{formatNumberWithCommas(item.score)}</span>
              </div>
            </section>
          </div>
        ))
      ) : (
        <BaseEmpty></BaseEmpty>
      )}
    </main>
  );
};

export default RankingUserList;
