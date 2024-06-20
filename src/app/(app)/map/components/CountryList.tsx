'use client';

import { BaseEmpty, SkeletonList } from '@/components';
import { formatNumberWithCommas } from '@/utils';
import ReactCountryFlag from 'react-country-flag';

export interface ICountryItem {
  country: string;
  totalUsers: number;
  totalScore: number;
  countryCode: string;
}

// 修改组件以接受 items 属性
interface CountryProps {
  items: ICountryItem[];
  loading: boolean;
}

const CountryList: React.FC<CountryProps> = ({ items, loading }) => {
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
            <ReactCountryFlag
              className="emojiFlag"
              countryCode={item.countryCode}
              style={{
                fontSize: '2em',
                lineHeight: '2em',
              }}
              aria-label="United States"
            />

            <section className="flex   w-full items-center justify-between">
              <div className="font-500 flex  w-full flex-col space-y-2">
                <span className="font-500 text-14">{item.country}</span>
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

export default CountryList;
